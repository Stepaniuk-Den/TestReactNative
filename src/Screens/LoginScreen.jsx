import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { Formik } from "formik";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { toggleVisibilityHelper } from "../helpers/helpers";
import LoginSchema from "../validation/LoginSchema";

import { authSignInUser } from "../redux/operations";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const { visibility, showPass, toggleVisibility } = toggleVisibilityHelper();

  const verticalOffsetDefault = -215;
  const [verticalOffset, setVerticalOffset] = useState(verticalOffsetDefault);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS == "ios" ? -230 : verticalOffset}
      >
        <View style={styles.root}>
          <ImageBackground
            style={styles.image}
            source={require("../../assets/images/PhotoBG.png")}
          >
            <View style={styles.rootLogin}>
              <Text style={styles.title}>Увійти</Text>
              <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                  dispatch(authSignInUser(values));
                  // navigation.navigate("Home");
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
                    <View style={styles.inputContainer}>
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
                          handleBlur;
                        }}
                        onFocus={() => setIsEmailFocus(true)}
                        type={
                          !isEmailFocus
                            ? null
                            : errors.email && touched.email
                            ? "ERROR"
                            : "TERTIARY"
                        }
                      />
                      {errors.email && touched.email ? (
                        <Text style={styles.errors}>{errors.email}</Text>
                      ) : null}
                    </View>
                    <View style={styles.inputContainer}>
                      <CustomInput
                        name="password"
                        placeholder="••••••••••••"
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
                        type={
                          !isPassFocus
                            ? null
                            : errors.password && touched.password
                            ? "ERROR"
                            : "TERTIARY"
                        }
                      />
                      <Pressable
                        style={styles.textVisible}
                        onPress={toggleVisibility}
                      >
                        <Text>{showPass}</Text>
                      </Pressable>
                      {errors.password && touched.password ? (
                        <Text style={styles.errors}>{errors.password}</Text>
                      ) : null}
                    </View>
                    <CustomButton
                      text="Увійти"
                      onPress={handleSubmit}
                      type="PRIMARY"
                    />
                  </>
                )}
              </Formik>
              <View style={styles.textReg}>
                <Text style={styles.text}>Немає акаунту? </Text>
                <Text
                  style={styles.textRegClick}
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  Зареєструватися
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
  rootLogin: {
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
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  textVisible: {
    position: "absolute",
    top: "50%",
    right: 16,
  },
  errors: {
    position: "absolute",
    fontSize: 10,
    color: "red",
    alignSelf: "center",
  },
});

export default LoginScreen;
