import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ButtonLogOut = ({ path, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.logout, styles[`logout_${type}`]]}
      onPress={() => navigation.navigate(path)}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logout: {
    width: 24,
    height: 24,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logout_profile: {
    position: "absolute",
    // width: 24,
    // height: 24,
    // marginRight: 16,
    top: 22,
    right: 0,

    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonLogOut;
