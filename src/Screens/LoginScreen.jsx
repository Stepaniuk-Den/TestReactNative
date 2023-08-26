import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSignUpPressed = () => {
    console.warn("Sign up");
  };
  const onSignInPressed = () => {
    console.warn("Sign in");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Увійти</Text>
      <CustomInput
        placeholder="Адреса електронної пошти"
        value={email}
        setValue={setEmail}
      />
      <View style={styles.password}>
        <CustomInput
          placeholder="••••••••••••"
          value={password}
          setValue={setPassword}
        />
        <View style={styles.textVisible}>
          <Text>Показати</Text>
        </View>
      </View>
      <CustomButton text="Увійти" onPress={onSignInPressed} type="PRIMARY" />
      {/* <CustomButton
        text="Немає акаунту? Зареєструватися"
        onPress={onSignUpPressed}
        type="TERTIARY"
      /> */}
      <View style={styles.textReg}>
        <Text>Немає акаунту? </Text>
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
    // fontWeight: 500,
    letterSpacing: 0.3,
  },
  textReg: {
    flexDirection: "row",
    color: "#1B4371",
    marginTop: 16,
  },
  textRegClick: {
    textDecorationLine: "underline",
  },
  password: {
    position: "relative",
    width: "100%",
  },
  textVisible: {
    position: "absolute",
    top: 32,
    right: 16,
  },
});

export default LoginScreen;
