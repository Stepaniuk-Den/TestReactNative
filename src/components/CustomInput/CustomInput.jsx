import { TextInput, View, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  autoCapitalize,
  placeholder,
  keyboardType,
  secureTextEntry,
  type,
  autoComplete,
  onChangeText,
  error,
  touched,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        onChangeText={onChangeText}
        error={error}
        touched={touched}
        onBlur={onBlur}
        onFocus={onFocus}
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
  container_PRIMARY: {},
  container_TERTIARY: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },

  input: {
    padding: 16,
    color: "#212121",
  },
});

export default CustomInput;
