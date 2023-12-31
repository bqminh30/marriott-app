import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";

import AppStack from "./AppStack";
import TabNavigation from "./TabNavigator";

import { initialize } from "../redux/actions/authAction";


const AppNav = () => {
  const { authToken, user } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();

  const init = async () => {
    await dispath(initialize());
   
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {authToken == undefined || authToken == null || !user? (
        <AppStack />
      ) : (
        <TabNavigation />
      )}
    </>
  );
};

export default AppNav;
