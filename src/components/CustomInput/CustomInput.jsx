import { TextInput, View, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  name,
  value,
  autoCapitalize,
  placeholder,
  keyboardType,
  secureTextEntry,
  type,
  autoComplete,
  onChangeText,
  onSubmitEditing,
  error,
  touched,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        style={[styles.input, styles[`input_${type}`]]}
        placeholder={placeholder}
        name={name}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
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
  container_INACTIVE: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    backgroundColor: "#fff",
    paddingLeft: 4,
  },
  container_INACTIVE_MAP: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    backgroundColor: "#fff",
    paddingLeft: 4,
  },
  container_TERTIARY: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  container_ERROR: {
    borderColor: "red",
    // backgroundColor: "#fff",
  },

  input: {
    padding: 16,
    color: "#212121",
  },
  input_INACTIVE: {
    paddingLeft: 0,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  input_INACTIVE_MAP: {
    paddingLeft: 34,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default CustomInput;
