import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
  },
  container_PRIMARY: {
    backgroundColor: "#FF6C00",

    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 43,

    borderRadius: 100,
  },

  container_TERTIARY: {
    marginTop: 16,
  },

  text: {
    fontWeight: 400,
    color: "white",
  },
  text_TERTIARY: {
    color: "#1B4371",
  },
});
export default CustomButton;
