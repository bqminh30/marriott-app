import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleProp,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { COLORS, SIZES } from "../../config/theme";

import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
import Button from "../../components/Button";

const ProfileChange = () => {
  const { user,authToken } = useSelector((state) => state.authReducer);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    cur_pass: "",
    new_pass1: "",
    new_pass2: "",
  });

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitPost = async () => {
    if (data.new_pass1 === data.new_pass2) {
      try {
        setLoading(true);
        await axios
          .post(
            `https://be-nodejs-project.vercel.app/api/customer/change-password`,
            {
              currentPassword: data.cur_pass,
              newPassword: data.new_pass1
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Gửi token trong header
                'Content-Type': 'application/json', // Có thể cần thiết tùy vào yêu cầu của API
              },
            }
          )
          .then((response) => {
            Alert.alert("Marriott", "Change Password Success", [
              {
                text: "Done",
                style: "cancel",
              },
            ]);
            setLoading(false);
          })
          .catch((err) => {
            Alert.alert("Marriott", "Change Password Error", [
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
            setLoading(false);
          });
      } catch (err) {
        console.log("err", err);
      }
    } else {
      Alert.alert("Marriott", "Password Not Match", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
              <ScrollView>
                <View style={styles.header}>
                  <Back />
                </View>
                {/* Your information details */}
                <View style={{ margin: 20 }}>
                  <Text style={styles.title}>Change Password Yourselft</Text>
                  <View>
                    <Spacer height={10} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Current Password"
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("cur_pass", text)}
                        style={styles.textInput}
                      />
                    </View>

                    <Spacer height={15} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="New Password"
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("new_pass1", text)}
                      />
                    </View>
                    <Spacer height={15} />

                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Enter New Password"
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("new_pass2", text)}
                      />
                    </View>
                    <Spacer height={15} />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <View
          style={[
            styles.flex,
            {
              marginHorizontal: SIZES.margin,
              justifyContent: "space-between",
              marginBottom: 30,
            },
          ]}
        >
          <Button
            label="Submit"
            onPress={submitPost}
            color={COLORS.white}
            background={COLORS.black}
            loading={false}
          />
        </View>
      </View>
    </>
  );
};

export default ProfileChange;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  title: {
    fontSize: 16,
    color: COLORS.main,
    fontFamily: "Poppins-Medium",
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
  textInput: { color: "black", fontSize: 16, width:200 },
  bottom: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    backgroundColor: COLORS.white,
  },
});
