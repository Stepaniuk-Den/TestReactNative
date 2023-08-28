import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { toggleVisibilityHelper } from "../helpers/helpers";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isUserFocus, setIsUserFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const { visibility, showPass, toggleVisibility } = toggleVisibilityHelper();

  const onSignUpPressed = () => {
    console.warn(
      `username: ${username}, email: ${email}, password: ${password}`
    );
  };
  const onSignInPressed = () => {
    // console.warn("Sign in");
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
        onBlur={() => setIsUserFocus(false)}
        onFocus={() => setIsUserFocus(true)}
        type={!isUserFocus ? null : "TERTIARY"}
      />
      <CustomInput
        placeholder="Адреса електронної пошти"
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
        autoComplete="email"
        onBlur={() => setIsEmailFocus(false)}
        onFocus={() => setIsEmailFocus(true)}
        type={!isEmailFocus ? null : "TERTIARY"}
      />
      <View style={styles.password}>
        <CustomInput
          placeholder="Пароль"
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
      <CustomButton
        text="Зареєструватися"
        onPress={onSignUpPressed}
        type="PRIMARY"
      />
      <View style={styles.textReg}>
        <Text style={styles.text}>Вже є акаунт? </Text>
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
    borderRadius: Platform.OS === "ios" ? "50%" : 50,
    backgroundColor: "#fff",
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

export default RegistrationScreen;
