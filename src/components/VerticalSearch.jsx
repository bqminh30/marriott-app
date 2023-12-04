import React from "react";
import { COLORS, SIZES } from "../config/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import Spacer from "./Spacer";

const stars = 5;
const VerticalSearch = ({ item, title }) => {
  const navigation = useNavigation();

  var starPush = [];
  for (var i = 1; i <= stars; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item.rating ? "star" : "star-o"}
        size={12}
        color={i <= item.rating ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  const handleFavorite = (item) => {
    console.log("item", item);
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={1}
      style={styles.component}
      onPress={() => {
        navigation.navigate("Chi tiết phòng", {
          room_id: item.id,
        });
      }}
    >
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View
        style={[
          styles._card,
          // {
          //   top: 10,
          //   left: 10,
          //   backgroundColor: COLORS.black,
          //   height: 24,
          // },
        ]}
      >
        <Text style={styles.typeroom}>
          {" "}
          {(item?.type_room_id === 1 && "Vip") ||
            (item?.type_room_id === 2 && "Normal") ||
            (item?.type_room_id === 3 && "New")}
        </Text>
      </View>
      <View
        style={[
          styles._card,
          {
            flexDirection: "column",
            justifyContent: "center",
            width: 140,
            height: 40,
            bottom: 90,
          },
        ]}
      >
        <View
          style={[
            styles.flex,
            {
              justifyContent: "center",
              width: 140,
            },
          ]}
        >
          <Text style={styles.price}>
            ${item?.priceSale ? item?.priceSale : item?.price}{" "}
            <Text style={styles._price}>
              {item?.priceSale ? item?.price : ""}
            </Text>{" "}
            /
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-MediumItalic",
              }}
            >
              night
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>
          {item?.name}
        </Text>

        <View
          style={[
            styles.card,
            styles.flex,
            { right: 10, gap: 20, backgroundColor: "white" },
          ]}
        >
          <TouchableOpacity
            style={styles.heart}
            onPress={() => navigation.navigate("Chi tiết phòng", {
              room_id: item.id,
            })}
          >
            <Feather name="upload" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heart}
            onPress={() => handleFavorite(item)}
          >
            <FontAwesome name="heart-o" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.rating, { justifyContent: "flex-start", gap: 10 }]}>
        <View style={styles.flex}>
          <View style={styles.flex}>{starPush}</View>
          <Text style={styles.text}>({item?.rating})</Text>
        </View>

        <Text>
          {item?.totalRating}
          <Text style={{ color: COLORS.gray_main }}> ratings</Text>
        </Text>
        <Text>
          {item?.totalReview}
          <Text style={{ color: COLORS.gray_main }}> reviews</Text>
        </Text>
      </View>
      <Spacer height={4} />

      <View style={[styles.flex, { gap: 10, justifyContent: "flex-start" }]}>
        <View style={[styles.flex, { gap: 4 }]}>
          <Ionicons name="bed" size={18} color={COLORS.main} />
          <Text style={{ color: COLORS.gray_main }}>
            {item?.numberBed} Beds
          </Text>
        </View>
        <View style={[styles.flex, { gap: 4 }]}>
          <Ionicons name="people" size={18} color={COLORS.main} />
          <Text style={{ color: COLORS.gray_main }}>
            {item?.numberPeople} Adults
          </Text>
        </View>
        <View style={[styles.flex, { gap: 4 }]}>
          <Ionicons name="person" size={18} color={COLORS.main} />
          <Text style={{ color: COLORS.gray_main }}>
            {item?.numberChildren} Childrens
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalSearch;

const styles = StyleSheet.create({
  component: {
    width: SIZES.width - 50,
    // backgroundColor:'red',
    marginBottom: 18,
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    marginRight: SIZES.padding,
  },
  image: {
    borderRadius: SIZES.radius,
    height: 180,
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    paddingTop: SIZES.default,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    fontWeight: 600,
    width: "70%",
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // text: {
  //   color: COLORS.gray_main,
  //   fontSize: 12,
  // },
  _rateText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: 600,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    padding: SIZES.margin,
  },

  heart: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.black,
    padding: 4,
    borderRadius: SIZES.margin,
    // width: 40,
    // position: "absolute",
    // top: 10,
    // left: 10,
  },
  _card: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    position: "absolute",

    right: 10,
  },
  typeroom: {
    color: COLORS.white,
    fontSize: 12,
    paddingHorizontal: 1,paddingVertical:4,
    fontFamily: "Poppins-Medium",
    textTransform: "uppercase",
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    padding:4,
  },
  price: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 24,
  },
  _price: {
    fontSize: 16,
    fontFamily: "Poppins-Thin",
    textDecorationLine: "line-through",
  },
});
