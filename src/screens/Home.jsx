import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../config/theme";
//component
import Avatar from "../components/Avatar";
import Menu from "../components/Menu";
import Spacer from "../components/Spacer";

import VerticalHome from "../components/VerticalHome";
import VerticalType from "../components/VerticalType";
import VerticalRecommend from "../components/VerticalRecommend";

import { getRooms, getTypeRooms } from "../redux/actions/roomAction";

import AsyncStorage from "@react-native-async-storage/async-storage";

const type_room = [
  {
    id: 5,
    name: "ALL",
  },
  {
    id: 1,
    name: "VIP",
  },
  {
    id: 2,
    name: "NORMAL",
  },
  {
    id: 3,
    name: "NEW",
  },
];
// =======================================
const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(null);
  const [displayedRooms, setDisplayedRooms] = React.useState();
  const [roomData, setRoomData] = React.useState([]);
  const [favoriteRooms, setFavoriteRooms] = React.useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const { typerooms, rooms } = useSelector((state) => state.roomReducer);
  const title = "HOME";
  // console.log('rooms', rooms)

  const dispath = useDispatch();

  const init = async () => {
    setLoading(true);
    await dispath(getRooms());
  };
  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  // Hàm để lọc danh sách phòng dựa trên loại phòng được chọn
  const filterRoomsByType = (typeId) => {
    setSelectedType(typeId);

    if (typeId === null || typeId === undefined || typeId === 5) {
      setDisplayedRooms(roomData); // Hiển thị toàn bộ danh sách phòng nếu không có loại được chọn
    } else {
      // Lọc danh sách phòng dựa trên loại phòng được chọn
      const filtered = roomData.filter((room) => room.type_room_id === typeId);
      setDisplayedRooms(filtered);
    }
  };

  useEffect(() => {
    setRoomData(rooms);
    setDisplayedRooms(rooms);
  }, [rooms]);

  const addToFavorites = (room) => {
    const isFavorite = favoriteRooms.some((favRoom) => favRoom.id === room.id);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteRooms.filter(
        (favRoom) => favRoom.id !== room.id
      );
    } else {
      updatedFavorites = [...favoriteRooms, room];
    }

    setFavoriteRooms(updatedFavorites);

    AsyncStorage.setItem("favoriteRooms", JSON.stringify(updatedFavorites))
      .then(() => {
        console.log("Favorite rooms saved successfully");
      })
      .catch((error) => {
        console.error("Error saving favorite rooms: ", error);
      });
  };

  useEffect(() => {
    // Lấy danh sách phòng mới từ favoriteRooms và cập nhật roomData
    const updatedRoomData = roomData.map((room) => {
      const isFavorite = favoriteRooms.some(
        (favRoom) => favRoom.id === room.id
      );
      return { ...room, isFavorite };
    });

    setRoomData(updatedRoomData);
    setDisplayedRooms(updatedRoomData);
  }, [favoriteRooms]);

  console.log("rooms", displayedRooms?.length);

  return (
    <>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: COLORS.white }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <StatusBar backgroundColor="#009387" barStyle="dark-content" />

          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View onStartShouldSetResponder={() => true}>
                <View style={styles.header}>
                  <Menu />
                  <Avatar />
                </View>
                <Spacer height={20} />
                <View style={styles.content}>
                  <Text style={styles.name}>Hello, {user.fullname}</Text>
                  <Text style={styles.title}>Best Hotel to Stay In</Text>
                </View>
                <Spacer height={10} />
                <FlatList
                  data={type_room}
                  onStartShouldSetResponder={() => true}
                  scrollEventThrottle={10}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <VerticalType
                      item={item}
                      selectedType={selectedType}
                      key={item.id}
                      filterRoomsByType={filterRoomsByType} // Gọi hàm filterRoomsByType khi loại phòng được chọn
                    />
                  )}
                  style={{ marginLeft: SIZES.padding }}
                />
                <Spacer height={20} />
                {loading == false && displayedRooms?.length > 0 && (
                  <FlatList
                    contentContainerStyle={{ alignSelf: "flex-start" }}
                    numColumns={2}
                    data={displayedRooms}
                    scrollEventThrottle={20}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                      <VerticalRecommend
                        item={item}
                        key={item.id}
                        title={title}
                        addToFavorites={addToFavorites}
                      />
                    )}
                    style={{ marginLeft: SIZES.padding, marginBottom: 170 }} // Sử dụng flex: 1 thay cho height cố định
                    horizontal={false} // Ngăn cuộn ngang
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;

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
    fontWeight: 700,
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
});
