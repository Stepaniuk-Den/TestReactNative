import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSignInPressed = () => {
    console.warn("Sign in");
  };

  return (
    <View style={styles.root}>
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
      <CustomInput
        placeholder="Пароль"
        value={password}
        setValue={setPassword}
      />
      <CustomButton text="Зареєструватися" onPress={onSignInPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 92,
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: 0.3,
  },
});

export default RegistrationScreen;
