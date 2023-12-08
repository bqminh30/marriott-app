import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../config/theme";

import { Entypo } from "@expo/vector-icons";
import Spacer from "./Spacer";

import moment from "moment";

const getStatusColorAndText = (status) => {
  let color = "";
  let text = "";
  let textCl = "";

  switch (status) {
    case 0:
      color = "yellow"; // Màu vàng cho status = 0
      textCl = "black";
      text = "Pending";
      break;
    case 1:
      color = "green"; // Màu xanh cho status = 1
      textCl = "white";
      text = "Paid";
      break;
    case 2:
      color = "red"; // Màu đỏ cho status = 2
      textCl = "white";
      text = "Overdue";
      break;
    case 3:
      color = "gray"; // Màu xám cho status = 3
      textCl = "white";
      text = "Draft";
      break;
    default:
      color = "black"; // Màu mặc định
      text = "Unknown";
      break;
  }

  return { color, text, textCl };
};

const VerticalBooking = ({ item, handleModalItem }) => {
  const { color, text, textCl } = getStatusColorAndText(item.status);

  const formattedDate = moment(item.createdDate).format("HH:mm DD-MM-YYYY");
  return (
    <>
      <View style={styles.card}>
        <View style={styles.component}>
          <View style={styles.left}>

            <View style={{ marginLeft: 4 }}>
            <Text style={[styles.name, {fontSize:20}]}>
                HD-{item?.id}
              </Text>
              <Spacer height={4}/>
              <Text style={styles.name} ellipsizeMode="tail">
                Fullname: {item?.fullname}
              </Text>
              <Text style={styles.name}>Email: {item?.email}</Text>
              <Text style={styles.name}>Code: {item?.code}</Text>
              <Text style={styles.name}>Phone: {item?.phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.right, { height: 30, width: 30 }]}
            onPress={() => handleModalItem(item.id, item.status)}
          >
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ width: "95%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 16 }}>
              Reservation status:{" "}
            </Text>
            <View
              style={{
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -5,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: textCl,
                  fontSize: 12,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  fontWeight: 500,
                }}
              >
                {text}
              </Text>
            </View>
          </View>
          <Text style={{ color: COLORS.black, fontSize: 16 }}>
            Payments: <Text style={{}}>PayPal</Text>
          </Text>
          <Text style={{ color: COLORS.black, fontSize: 16 }}>
            Booking Date: {formattedDate}
          </Text>
          <Spacer height={8} />
          <View
            style={[
              styles.flex,
              { flexDirection: "row-reverse", marginBottom: 6 },
            ]}
          >
            <Text style={{ fontSize: 16 }}>$</Text>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.total}</Text>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Total: </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default VerticalBooking;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 12,
  },
  component: {
    // borderRadius: SIZES.radius,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  componentDate: {
    borderRadius: SIZES.radius,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  left: {
    width: "90%",
    flexDirection: "row",
    gap: 4,
  },
  imageMain: {
    height: 70,
    width: 70,
    borderRadius: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "Poppins-Medium",
  },
  rating: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.gray_main,
    fontSize: 15,
  },
  rate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: COLORS.gray,
    fontSize: 12,
  },
  right: {
    width: "10%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
