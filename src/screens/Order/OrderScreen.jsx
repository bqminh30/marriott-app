import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import PhoneInput from "react-native-international-phone-number";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { WebView } from "react-native-webview";
import axios from "axios";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../config/theme";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
import VerticalOrder from "../../components/VerticalOrder";

// redux context
import { useBooking } from "../../redux/context/BookingContext";

const calculateTotalSum = (bookings) => {
  let totalSum = 0;
  if (!bookings) {
    return totalSum;
  } else {
    bookings?.forEach((booking) => {
      totalSum += booking.total;
    });
  }

  return totalSum;
};

const OrderScreen = () => {
  const { booking, setStep, step, saveBooking } = useBooking();
  const { user } = useSelector((state) => state.authReducer);

  const [value, setValue] = useState({
    fullname: user?.fullname,
    email: user?.email,
    birthday: user?.birthday,
    code: user?.code,
    phonenumber: user?.phonenumber,
    gender: "1",
  });

  console.log("user?.code", user?.code);

  const sumTotal = calculateTotalSum(booking?.bookings);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [urlPaypal, setUrlPaypal] = useState("");
  const [idRoom, setIdRoom] = useState()

  const formateDate = moment(value.birthday).format("DD-MM-yyyy");

  const activeButton = (data) => {
    setIdRoom(data.room_id)
    console.log(data.room_id);
    setShowModal2(true);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("DD/MM/yyyy");
    setValue({
      ...value,
      birthday: formattedDate,
    });
    hideDatePicker();
  };

  const handleInputChange = (fieldName, text) => {
    setValue({
      ...value,
      [fieldName]: text,
    });
  };

  const handleChangeMethodPayment = (title, status) => {
    if (title == "paypal") {
      setShowGateway(status);
      setShowTitle(title);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.get(
        "https://be-nodejs-project.vercel.app/create",
        {
          data: sumTotal,
        }
      );
      const paymentLinks = response.data;

      // Find the approval URL
      // const approvalURL = paymentLinks.find(link => link.rel === 'approval_url');

      if (paymentLinks.approval_url) {
        setShowModal(true);
        setUrlPaypal(paymentLinks.approval_url);
        const updatedOrder = {
          createdDate: new Date(),
          count: booking.bookings.length,
          status: 0,
          total: sumTotal,
          note: "",
          customer_id: user?.id,
          profile: value,
        };

        // Lưu thông tin đặt phòng và thông tin thanh toán
        saveBooking({ ...booking, order: updatedOrder, method: showTitle });

        console.log("Approval URL: ", paymentLinks.approval_url);
        // Handle this URL as needed, e.g., navigate to PayPal URL
      } else {
        console.log("Approval URL not found in the response");
      }
    } catch (error) {
      console.error("Error fetching payment URL: ", error);
    }
  };

  const hanldeApiBooking = async () => {
    try {
      const response = await axios.post(
        "https://be-nodejs-project.vercel.app/api/orders/booking",
        {
          order: booking.order,
          orderDetails: booking.bookings,
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Marriott",
          "You have successfully paid, please wait for confirmation",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        saveBooking(null);
      } else {
        console.log("Approval URL not found in the response");
      }
    } catch (error) {
      console.error("Error fetching payment URL: 1111", error);
    }
  };

  const handleRemoveRoom = (idRoom) => {
    const updatedBookings = booking.bookings.filter((booking) => booking.room_id !== idRoom);
    const updatedOrder = { ...booking.order, /* Update order here based on the room_id */ };
    const updatedMethod = { ...booking.method, /* Update method here based on the room_id */ };
    
    saveBooking({
      ...booking,
      bookings: updatedBookings,
      order: updatedOrder,
      method: updatedMethod,
    });
    // console.log('update', updatedBookings);
    setShowModal2(false)
  };

  if (booking == null || Object.keys(booking).length === 0) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/empty-booking.jpeg")}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Not order booking
          </Text>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
      >
        <GestureHandlerRootView style={styles.safeview}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView
                  style={{ flex: 1, backgroundColor: COLORS.white }}
                >
                  <View>
                    <View style={styles.header}>
                      <Back />
                      <Text style={styles.title}>Booking Form</Text>
                      <Avatar />
                    </View>
                    <Spacer height={10} />
                    <FlatList
                      data={booking?.bookings}
                      scrollEventThrottle={20}
                      horizontal={false}
                      keyExtractor={({ item, index }) => index}
                      renderItem={({ item, index }) => (
                        <VerticalOrder
                          item={item}
                          key={item.id}
                          activeButton={activeButton}
                        />
                      )}
                      style={{ marginBottom: 10 }}
                    />
                    <Spacer height={4} />
                    <View style={{ marginHorizontal: SIZES.padding }}>
                      <Text style={styles.total}>Total</Text>
                      <Text
                        style={[styles.total, { fontFamily: "Poppins-Bold" }]}
                      >
                        {sumTotal} $
                      </Text>
                    </View>
                    <Spacer height={8} />
                    {/* dash  */}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.gray,
                        // marginHorizontal: SIZES.padding,
                      }}
                    ></View>
                    <View style={{ margin: 12 }}>
                      <Text style={styles.title}>Your Information Details</Text>
                      <View>
                        <Spacer height={10} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Full Name"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("fullname", text)
                            }
                            value={value?.fullname}
                          />
                        </View>
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Code/ Zip"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("code", text)
                            }
                            value={value?.code}
                          />
                        </View>
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            autoComplete="email"
                            placeholder="Email Address"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("email", text)
                            }
                            value={value?.email}
                          />
                          <MaterialIcons
                            name="email"
                            size={20}
                            color={COLORS.gray_main}
                          />
                        </View>
                        <Spacer height={15} />

                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            value={value?.phonenumber}
                            onChangeText={(text) =>
                              handleInputChange("phonenumber", text)
                            }
                            placeholder="Phone Number"
                            style={styles.textInput}
                          />
                          <MaterialIcons
                            name="phone"
                            size={20}
                            color={COLORS.gray_main}
                          />
                        </View>

                        {/* <Spacer height={15} />
                        <RadioGroup
                          containerStyle={{
                            color: "red",
                          }}
                          layout="row"
                          radioButtons={radioButtons}
                          onPress={setSelectedId}
                          selectedId={selectedId}
                        /> */}
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Birthday"
                            style={styles.textInput}
                            value={formateDate}
                            onPressIn={showDatePicker}
                          />
                          <MaterialIcons
                            name="date-range"
                            size={20}
                            color={COLORS.gray_main}
                          />
                        </View>

                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                          maximumDate={new Date()}
                        />
                        <Spacer height={8} />
                      </View>
                    </View>
                    {/* dash  */}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.gray,
                        // marginHorizontal: SIZES.padding,
                      }}
                    ></View>

                    <View style={{ margin: 12 }}>
                      <Text style={styles.title}>
                        Select the payment method
                      </Text>
                      <View>
                        <Spacer height={10} />
                       
                        {/* <Spacer height={5}/> */}
                        <View style={styles.inputMethod}>
                          <TouchableOpacity
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() =>
                              handleChangeMethodPayment("paypal", !showGateway)
                            }
                          >
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../../assets/paypal.png")}
                            />
                            <Text style={{ fontWeight: 600, fontSize: 18 }}>
                              Paypal
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.outter}
                            onPress={() =>
                              handleChangeMethodPayment("paypal", !showGateway)
                            }
                          >
                            {showGateway === true && showTitle == "paypal" && (
                              <View style={styles.inner}></View>
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.inputMethod,
                            {
                              justifyContent: "center",
                              paddingVertical: 14,
                              backgroundColor: COLORS.black,
                            },
                          ]}
                        >
                          <TouchableOpacity onPress={handlePayment}>
                            <Text
                              style={{
                                fontWeight: 600,
                                fontSize: 18,
                                color: "white",
                              }}
                            >
                              Checkout
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </ScrollView>

      <Modal visible={showModal} onRequestClose={() => setShowGateway(false)}>
        <WebView
          source={{ uri: urlPaypal }}
          onNavigationStateChange={(navState) => {
            if (navState.title === "" && navState.canGoBack === true) {
              setShowModal(false); // Tắt Modal khi title trở thành ""
              hanldeApiBooking();
              // setShowSuccessMessage(true); // Hiển thị thông báo thanh toán thành công
              // Alert.alert("Marriott", "You have successfully paid, please wait for confirmation", [

              //   { text: "OK", onPress: () => console.log("OK Pressed") },
              // ]);
            }
          }}
        />
      </Modal>

      <Modal visible={showModal2}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: "90%",
              borderRadius: SIZES.radius,
              // padding: 35,
              // alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 2,
              marginHorizontal: 12,
              // height: "50%",
              // justifyContent: "center",
            }}
          >
            <Text style={{padding:10, fontSize:18, fontWeight:500}}>Do you want to remove the room from your booking calendar?</Text>
            <View
              style={{
                margin: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRemoveRoom(idRoom)}
              >
                <Text style={{ color: "white", fontSize:16 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal2(false)}
              >
                <Text style={{ color: "white" , fontSize:16}}>{`No`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  content: {
    marginHorizontal: SIZES.padding,
  },
  name: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Poppins-Bold",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 46,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
  imageStyle: {
    padding: 8,
  },
  total: {
    textAlign: "right",
    fontWeight: 700,
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  inputContainer: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.grayDefault,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: { color: COLORS.black, fontSize: 16, width: "90%" },
  inputMethod: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    alignItems: "center",
    shadowColor: "#bcbcbc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.black,
    borderRadius: 10,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dotline: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    color: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 12,
  },
});
