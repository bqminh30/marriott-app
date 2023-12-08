import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../config/theme";

import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
//Redux
import { useBooking } from "../redux/context/BookingContext"; //
const Cart = () => {
  const navigation = useNavigation()
  const { booking } = useBooking();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate('Order')} style={styles.cart}>
      <FontAwesome name="shopping-cart" size={24} color="black" />
      <View style={styles.card}>
      <Text style={styles.text}>{booking?.bookings?.length
            ? booking?.bookings?.length
            : 0}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cart: {
    width: 36,
    height: 36,
    borderRadius: 50,
    resizeMode: "center",
  },
  card: {
    width: 16,
    height: 16,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 2,
    backgroundColor: 'red'
    },
  text: {
    textAlign: 'center',
    color: COLORS.white
  }
});


