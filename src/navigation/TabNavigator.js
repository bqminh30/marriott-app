import { COLORS, SIZES } from "../config/theme";
import { Home, RoomList, SearchScreen, RoomDetail } from "../screens";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProfileChange,
  ProfilePassword,
  ProfileScreen,
  ProfileFavorite,
  ProfileBooking,
  ProfileBookingDetail,
} from "../screens/Profile";
import {
  OrderScreen,
  InformationScreen,
  ReviewSummaryScreen,
} from "../screens/Order";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

//Redux
import { useBooking } from "../redux/context/BookingContext"; //

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const { booking } = useBooking();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Search") {
              iconName = focused ? "search-circle" : "search-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />

      <Tab.Screen
        name="Order"
        component={OrderScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarBadge: booking?.bookings?.length
            ? booking?.bookings?.length
            : 0,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Order") {
              iconName = focused ? "cart" : "cart-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
    </Tab.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
    </Tab.Navigator>
  );
};
const TabNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Chi tiết phòng"
        component={RoomDetail}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Information Detail"
        component={InformationScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      {/* <Stack.Screen
        name="Select Payment"
        component}
        options={{ unmountOnBlur: true, headerShown: false }}
      /> */}
      <Stack.Screen
        name="Favorite Room"
        component={ProfileFavorite}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Review Summary"
        component={ReviewSummaryScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Thông tin Profile"
        component={ProfileChange}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Đổi mật khẩu"
        component={ProfilePassword}
        options={{ unmountOnBlur: true, headerShown: false }}
      />

      <Stack.Screen
        name="ProfileBooking"
        component={ProfileBooking}
        options={{ unmountOnBlur: true, headerShown: false }}
      />

      <Stack.Screen
        name="ProfileBookingDetail"
        component={ProfileBookingDetail}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TabNavigation;
