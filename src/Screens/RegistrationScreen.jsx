import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { AntDesign } from "@expo/vector-icons";

import { toggleVisibilityHelper } from "../helpers/helpers";
import RegisterSchema from "../validation/RegisterSchema";

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [isUserFocus, setIsUserFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const { visibility, showPass, toggleVisibility } = toggleVisibilityHelper();

  const verticalOffsetDefault = -140;
  const [verticalOffset, setVerticalOffset] = useState(verticalOffsetDefault);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS == "ios" ? -160 : verticalOffset}
      >
        <View style={styles.root}>
          <ImageBackground
            style={styles.image}
            source={require("../../assets/images/PhotoBG.png")}
          >
            <View style={styles.rootReg}>
              <View style={styles.avatar}>
                <View style={styles.addIconContainer}>
                  <AntDesign
                    style={styles.addIcon}
                    name="pluscircleo"
                    size={24}
                  />
                </View>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <Formik
                validationSchema={RegisterSchema}
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={(values, actions) => {
                  // console.warn(values);
                  // addUser(values);
                  navigation.navigate("Home", values);
                  actions.resetForm();
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <CustomInput
                      name="username"
                      placeholder="Логін"
                      value={values.username}
                      autoCapitalize="none"
                      autoComplete="username"
                      onChangeText={handleChange("username")}
                      error={errors.username}
                      touched={touched.username}
                      onSubmitEditing={() => handleSubmit()}
                      onBlur={() => {
                        setIsUserFocus(false);
                        handleBlur("username");
                      }}
                      onFocus={() => setIsUserFocus(true)}
                      type={!isUserFocus ? null : "TERTIARY"}
                    />
                    {errors.username && touched.username ? (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.username}
                      </Text>
                    ) : null}
                    <CustomInput
                      name="email"
                      placeholder="Адреса електронної пошти"
                      value={values.email}
                      autoCapitalize="none"
                      autoComplete="email"
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      error={errors.email}
                      touched={touched.email}
                      onSubmitEditing={() => handleSubmit()}
                      onBlur={() => {
                        setIsEmailFocus(false);
                        handleBlur("email");
                        Platform.OS === "ios"
                          ? null
                          : setVerticalOffset(verticalOffsetDefault);
                      }}
                      onFocus={() => {
                        setIsEmailFocus(true);
                        Platform.OS === "ios" ? null : setVerticalOffset(-185);
                      }}
                      type={!isEmailFocus ? null : "TERTIARY"}
                    />
                    {errors.email && touched.email ? (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.email}
                      </Text>
                    ) : null}
                    <View style={styles.password}>
                      <CustomInput
                        name="password"
                        placeholder="Пароль"
                        value={values.password}
                        autoCapitalize="none"
                        onChangeText={handleChange("password")}
                        secureTextEntry={visibility}
                        error={errors.password}
                        touched={touched.password}
                        onSubmitEditing={() => handleSubmit()}
                        onBlur={() => {
                          setIsPassFocus(false);
                          handleBlur("password");
                          Platform.OS === "ios"
                            ? null
                            : setVerticalOffset(verticalOffsetDefault);
                        }}
                        onFocus={() => {
                          setIsPassFocus(true);
                          Platform.OS === "ios"
                            ? null
                            : setVerticalOffset(-260);
                        }}
                        type={!isPassFocus ? null : "TERTIARY"}
                      />
                      <Pressable
                        style={styles.textVisible}
                        onPress={toggleVisibility}
                      >
                        <Text>{showPass}</Text>
                      </Pressable>
                    </View>
                    {errors.password && touched.password ? (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.password}
                      </Text>
                    ) : null}
                    <CustomButton
                      text="Зареєструватися"
                      onPress={handleSubmit}
                      type="PRIMARY"
                    />
                  </>
                )}
              </Formik>
              <View style={styles.textReg}>
                <Text style={styles.text}>Вже є акаунт? </Text>
                <Text
                  style={styles.textRegClick}
                  onPress={() => navigation.navigate("Login")}
                >
                  Увійти
                </Text>
              </View>
            </View>
          </ImageBackground>
          {/* <StatusBar style="auto" /> */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
  rootReg: {
    position: "relative",
    backgroundColor: "#fff",
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
    borderRadius: 50,
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
