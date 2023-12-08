import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../config/theme";

import VerticalSearch from "../../components/VerticalSearch";
import Back from "../../components/Back";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacer from "../../components/Spacer";

const ProfileFavorite = () => {
  const [favoriteRooms, setFavoriteRooms] = React.useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi component được mount
    AsyncStorage.getItem("favoriteRooms")
      .then((data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          setFavoriteRooms(parsedData);
        }
      })
      .catch((error) => {
        console.error("Error retrieving favorite rooms: ", error);
      });
  }, []); // Gọi useEffect chỉ khi component được mount

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar backgroundColor="#009387" barStyle="dark-content" />
        <SafeAreaView style={{marginBottom:20}}>
          <View style={styles.header}>
            <Back />
            <View></View>
          </View>
          <Spacer height={10}/>
          <FlatList
            data={favoriteRooms}
            scrollEventThrottle={10}
            keyExtractor={({ item, index }) => `${index}`}
            renderItem={({ item, index }) => (
              <VerticalSearch item={item} key={item.id} />
            )}
            style={{ marginBottom: 24, marginLeft: 24 }}
          />
          <Spacer height={20}/>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ProfileFavorite;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
