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
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    borderRadius: 100,
  },
  container_PRIMARY: {
    backgroundColor: "#FF6C00",
    marginTop: 43,
  },

  container_INACTIVE: {
    marginTop: 32,
    backgroundColor: "#f6f6f6",
  },

  text: {
    fontWeight: 400,
    color: "white",
  },
  text_INACTIVE: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#bdbdbd",
  },
});
export default CustomButton;
