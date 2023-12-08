import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../config/theme";

const VerticalBookingDetail = ({ item, handleAction, status }) => {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.component}>
          <View style={styles.left}>
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.name}>Room name: {item?.room_name}</Text>
              <Text style={styles.title}>Price day: {item.price}$</Text>
            </View>
          </View>
        </View>

        <View style={{ width: "90%" }}>
          <Text style={{ color: "black", fontSize: 14 }}>
            {item.checkinDate} - {item.checkoutDate} ({item.dateCount})days
          </Text>
          <View
            style={[
              styles.flex,
              { flexDirection: "row-reverse", marginBottom: 6 },
            ]}
          >
            <Text style={{ fontSize: 14 }}>$</Text>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.total}</Text>
          </View>
        </View>
      </View>
      {status === 1 && (
        <>
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
              onPress={() => handleAction("review", item)}
            >
              <Text style={{ color: "white" }}>Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAction("service", item)}
            >
              <Text style={{ color: "white" }}>Add Services</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default VerticalBookingDetail;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
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
    width: "95%",
    flexDirection: "row",
    gap: 4,
  },
  imageMain: {
    height: 70,
    width: 70,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins-Medium",
  },
  rating: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    // color: COLORS.gray_main,
    paddingTop: 4,
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
    width: "5%",
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 12,
  },
});
