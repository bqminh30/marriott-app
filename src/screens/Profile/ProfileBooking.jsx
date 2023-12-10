import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  // CheckBox
} from "react-native";
import { useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../config/theme";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { CheckBox, Button } from "react-native-elements";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Back from "../../components/Back";

import VerticalBooking from "../../components/VerticalBooking";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ProfileBooking = ({ navigation }) => {
  //   const navigation = useNavigation();
  const { user } = useSelector((state) => state.authReducer);
  const [dataBooking, setDataBooking] = useState([]);

  const bottomSheetModalRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(null);
  const snapPoints = useMemo(() => [1, "20%", "30%"], []);

  

  const handleCallBooking = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://be-nodejs-project.vercel.app/api/orders/customers/${user.id}`
    );
    if (response.status === 200) {
      setDataBooking(response.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCallBooking();
  }, []);

  const handleModalItem = (item, status) => {
    setValue(item);
    setStatus(status);
    handlePress();
  };

  const handlePress = () => {
    if (status !== 3 || status !== 4) {
      bottomSheetModalRef.current?.expand();
      setIsModal(true);
    }
  };

  const handleSheetChange = useCallback((index) => {
    if (index === -1 || index === 0) {
      bottomSheetModalRef.current?.close();
    }
  }, []);


  

  return (
    <>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: COLORS.white }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* <View style={{ flex: 1, backgroundColor: COLORS.white }}> */}
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.header}>
              <Back />
              <View></View>
            </View>

            {isLoading == true ? (
              <>
                <View></View>
              </>
            ) : (
              <>
                {dataBooking.length > 0 ? (
                  <FlatList
                    data={dataBooking}
                    scrollEventThrottle={10}
                    keyExtractor={({ item, index }) => `${index}`}
                    renderItem={({ item, index }) => (
                      <VerticalBooking
                        item={item}
                        key={item.id}
                        handleModalItem={handleModalItem}
                      />
                    )}
                    style={{ marginHorizontal: 10 }}
                  />
                ) : (
                  <>
                  <View style={{height: SIZES.height * 0.95, justifyContent:'center',
                alignItems:'center'}}>
                  <Text style={{fontWeight:500, fontSize: 20}}>There are no reservations yet</Text>
                  </View>
                   
                  </>
                )}
              </>
            )}
          </SafeAreaView>

          <BottomSheet
            ref={bottomSheetModalRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose
            enableOverDrag
            pressBehavior={"close"}
            backgroundStyle={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            {/* {isModal == true && ( */}
            <BottomSheetView>
              <View style={{ margin: 20 }}>
                <TouchableOpacity
                  style={styles.touchAction}
                  onPress={
                    () =>
                      navigation.navigate("ProfileBookingDetail", {
                        item: value,
                        status,
                      })
                    // console.log('adadf')
                  }
                >
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    See room reservation list
                  </Text>
                  <AntDesign name="caretright" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchAction}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Contact to cancel
                  </Text>
                  <AntDesign name="caretright" size={20} color="black" />
                </TouchableOpacity>
                {/* {status === 1 && (
                  <TouchableOpacity
                    style={styles.touchAction}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>
                      Add services
                    </Text>
                    <AntDesign name="caretright" size={20} color="black" />
                  </TouchableOpacity>
                )} */}
              </View>
            </BottomSheetView>
            {/* )} */}
          </BottomSheet>

          {/* )} */}
        </KeyboardAvoidingView>
      </GestureHandlerRootView>

      
    </>
  );
};

export default ProfileBooking;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  touchAction: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 12,
  },
});
