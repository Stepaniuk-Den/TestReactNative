import { TextInput, View, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({ value, setValue, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    color: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  input: {
    padding: 16,
    color: "#212121",
  },
});

export default CustomInput;
