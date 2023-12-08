import React, { useEffect, useState,useMemo } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CheckBox, Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import { COLORS, SIZES } from "../../config/theme";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-native-modal";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import VerticalBookingDetail from "../../components/VerticalBookingDetail";
import Back from "../../components/Back";
import Spacer from "../../components/Spacer";

const ProfileBookingDetail = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.authReducer);
  const { item,status } = route?.params;
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [data, setData] = useState([]);

  const [item_id, setItemId] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [beds, setBeds] = useState([
    { id: 7, name: "Single Bed", price: 0, selected: false },
    { id: 8, name: "Double Bed", price: 10, selected: false },
    { id: 9, name: "Children's Beds", price: 20, selected: false },
  ]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedBedId, setSelectedBedId] = useState(null);

  const handleCheckBox = (index) => {
    const updatedBeds = beds.map((bed, i) => {
      if (i === index) {
        return { ...bed, selected: true };
      } else {
        return { ...bed, selected: false };
      }
    });
    setBeds(updatedBeds);
    const selectedBed = updatedBeds.find((bed) => bed.selected);
    if (selectedBed) {
      setSelectedPrice(selectedBed.price);
      setSelectedBedId(selectedBed.id); // Lấy ID của giường được chọn
    } else {
      setSelectedPrice(null);
      setSelectedBedId(null);
    }
  };

  const removeSelected = () => {
    const filteredBeds = beds.filter((bed) => !bed.selected);
    setBeds(filteredBeds);
  };

  const handleCallBooking = async () => {
    const response = await axios.get(
      `https://be-nodejs-project.vercel.app/api/orders/${item}`
    );
    if (response.status === 200) {
      setData(response.data.order_detail);
    }
  };

  useEffect(() => {
    handleCallBooking();
  }, []);

  const handleAction = (title, data) => {
    setItemId(data.room_id)
    setModalVisible(true);
    setTitle(title)
  };

  const handleClear =() => {
    setRating(5)
    setContent('')
  }

  const handleReview= async ()=> {
    try{
      const response = await axios.post(`https://be-nodejs-project.vercel.app/api/reviews/create`, {
        content: content,
        rating: rating,
        room_id: item_id,
        customer_id: user.id
      })
      if(response.status == 403){
        setModalVisible(false);
        Alert.alert('Marriott', 'You have already review this room', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      }else if(response.status == 200){
        setModalVisible(false);
        handleClear()
        Alert.alert('Marriott', 'You have review success', [
          {
            text: 'Oke',
            style: 'cancel',
          },
        ]);
      }else {
        console.log('err', response.status)
      }
    }catch(e){
      setModalVisible(false);
      Alert.alert('Marriott', 'You have already review this room', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  }

  const handleAddService = async () => {
    setIsLoading(true)
    let data = {
      quantity : 1,
      active: selectedBedId === 7 ? 1 : 0,
      room_id: item_id,
      service_id: selectedBedId,
      customer_id: user.id,
      order_id: item
    }
    console.log('data',data)
   try{
    const res = await axios.post('https://be-nodejs-project.vercel.app/api/room_service/create', data)
    if(res){
      setIsLoading(false)
      setModalVisible(false)
      Alert.alert('Marriott', 'You add service success', [
        {
          text: 'Oke',
          style: 'cancel',
        },
      ]);
    }
   }catch(e){
    console.log('e', e)
    Alert.alert('Marriott', 'An error occurred. Please try again', [
      {
        text: 'Oke',
        style: 'cancel',
      },
    ]);
    setIsLoading(false)
   }
   
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor="#009387" barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.header}>
            <Back />
            <View></View>
          </View>
          <FlatList
            data={data}
            scrollEventThrottle={10}
            keyExtractor={({ item, index }) => `${index}`}
            renderItem={({ item, index }) => (
              <VerticalBookingDetail
                item={item}
                key={item.id}
                handleAction={handleAction}
                status={status}
              />
            )}
            style={{ marginHorizontal: 10 }}
          />
        </SafeAreaView>

        <Modal isVisible={isModalVisible}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "95%",
                // height: "50%",
                // justifyContent: "center",
              }}
            >
              {
                title === 'review' ?
                <>
                <Spacer height={8} />
              <Text style={styles._title}>Review</Text>
              <Stars
                default={5}
                count={5}
                update={(val)=> setRating(val)}
                half={false}
                starSize={100}
                fullStar={
                  <Icon size={30} name={"star"} style={[styles.myStarStyle]} />
                }
                emptyStar={
                  <Icon
                    size={30}
                    name={"star-outline"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon
                    size={30}
                    name={"star-half"}
                    style={[styles.myStarStyle]}
                  />
                }
              />
              <Text style={styles._title}>Comment</Text>
              <View style={{ marginHorizontal: 18 }}>
                <TextInput
                  value={content}
                  onChangeText={(text) =>setContent(text)}
                 
                  style={styles._inputStyle}
                  placeholderTextColor={COLORS.gray_main}
                  numberOfLines={4}
                  multiline={true}
                  placeholder="I hope that this place is good and comforatble during my vacation"
                />
              </View>
              <Spacer height={10} />
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleReview()}
                >
                  <Text style={{ color: "white" }}>Add Review</Text>
                </TouchableOpacity>
              </View>
                </>
                :
                <>
                 {beds.map((bed, index) => (
              <View
                key={bed.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                title={beds.name}
                  checked={bed.selected}
                  onPress={() => handleCheckBox(index)}
                />
                <Text>{bed.name}</Text>
              </View>
            ))}
            {selectedPrice !== null && (
              <View>
                <Text style={{ paddingLeft: 12 }}>
                  Selected Price: ${selectedPrice}
                </Text>
              </View>
            )}
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
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddService()}
              >
                <Text style={{ color: "white" }}>{isLoading == true ? 'Loading': `Add Service`}</Text>
              </TouchableOpacity>
            </View>
                </>
              }
            </View>
          </View>
        </Modal>

        
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ProfileBookingDetail;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  _title: {
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 22,
  },
  _inputStyle: {
    height: 80,
    backgroundColor: COLORS.grayDefault,
    borderRadius: SIZES.radius,
    marginTop: 4,
    padding: 8,
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 12,
  },
});
