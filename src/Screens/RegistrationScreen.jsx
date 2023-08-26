import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
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
      <View style={styles.avatar}>
        <View style={styles.addIconContainer}>
          <AntDesign style={styles.addIcon} name="pluscircleo" size={24} />
        </View>
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <CustomInput
        placeholder="Логін"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Адреса електронної пошти"
        value={email}
        setValue={setEmail}
      />
      <View style={styles.password}>
        <CustomInput
          placeholder="Пароль"
          value={password}
          setValue={setPassword}
        />
        <View style={styles.textVisible}>
          <Text>Показати</Text>
        </View>
      </View>
      <CustomButton
        text="Зареєструватися"
        onPress={onSignUpPressed}
        type="PRIMARY"
      />
      {/* <CustomButton
        text="Вже є акаунт? Увійти"
        onPress={onSignInPressed}
        type="TERTIARY"
      /> */}
      <View style={styles.textReg}>
        <Text>Вже є акаунт? </Text>
        <Text style={styles.textRegClick} onPress={onSignInPressed}>
          Увійти
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
    backgroundColor: "#fff",
    // flex: 1,
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: 549,
    // marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 92,
    marginBottom: 17,
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontStyle: "normal",
    // fontWeight: 500,
    letterSpacing: 0.3,
  },
  avatar: {
    position: "absolute",
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: -60,
  },
  addIcon: {
    color: "#FF6C00",
  },
  addIconContainer: {
    position: "absolute",
    right: -12,
    top: 88,
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

export default RegistrationScreen;
