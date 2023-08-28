import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { toggleVisibilityHelper } from "../helpers/helpers";
const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const { visibility, showPass, toggleVisibility } = toggleVisibilityHelper();

  const onSignUpPressed = () => {
    console.warn("Sign up");
  };
  const onSignInPressed = () => {
    console.warn(email, password);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Увійти</Text>
      <CustomInput
        placeholder="Адреса електронної пошти"
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
        onBlur={() => setIsEmailFocus(false)}
        onFocus={() => setIsEmailFocus(true)}
        type={!isEmailFocus ? null : "TERTIARY"}
      />
      <View style={styles.password}>
        <CustomInput
          placeholder="••••••••••••"
          value={password}
          setValue={setPassword}
          secureTextEntry={visibility}
          onBlur={() => setIsPassFocus(false)}
          onFocus={() => setIsPassFocus(true)}
          type={!isPassFocus ? null : "TERTIARY"}
        />
        <Pressable style={styles.textVisible} onPress={toggleVisibility}>
          <Text>{showPass}</Text>
        </Pressable>
      </View>
      <CustomButton text="Увійти" onPress={onSignInPressed} type="PRIMARY" />
      <View style={styles.textReg}>
        <Text style={styles.text}>Немає акаунту? </Text>
        <Text style={styles.textRegClick} onPress={onSignUpPressed}>
          Зареєструватися
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    // flex: 1,
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 17,
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontStyle: "normal",
    letterSpacing: 0.3,
  },
  textReg: {
    flexDirection: "row",
    marginTop: 16,
  },
  text: {
    color: "#1B4371",
  },
  textRegClick: {
    textDecorationLine: "underline",
    color: "#1B4371",
  },
  password: {
    position: "relative",
    width: "100%",
  },
  textVisible: {
    position: "absolute",
    top: "50%",
    right: 16,
  },
});

export default LoginScreen;
