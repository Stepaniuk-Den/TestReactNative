import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { auth } from "../../config";

import { Formik } from "formik";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";

import { AntDesign } from "@expo/vector-icons";

import { toggleVisibilityHelper } from "../helpers/helpers";
import RegisterSchema from "../validation/RegisterSchema";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config";
import { addUser } from "../redux/rootReducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { selectUserData } from "../redux/selectors";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isUserFocus, setIsUserFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);

  const { visibility, showPass, toggleVisibility } = toggleVisibilityHelper();

  const verticalOffsetDefault = -140;
  const [verticalOffset, setVerticalOffset] = useState(verticalOffsetDefault);
  const userData = useSelector(selectUserData);

  const saveImage = async () => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      await uploadBytes(ref(storage, `avatars/${file._data.blobId}`), file);
      const imgUrl = await getDownloadURL(
        ref(storage, `avatars/${file._data.blobId}`)
      );
      return imgUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
    saveImage();
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const updatedUser = {
          displayName: user.username,
          photoURL: avatar ? avatar : null,
        };
        return updateProfile(userCredential.user, updatedUser).then(() => {
          return signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
          ).then(() => {
            const userData = {
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              // token: userCredential.user.stsTokenManager.accessToken,
            };
            dispatch(
              addUser({
                ...userData,
                ...updatedUser,
              })
            );
          });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Користувач з таким email вже зареєстрований");
        } else {
          console.log(error.code, error.message);
        }
      });
  };

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
                {avatar ? (
                  <Image
                    style={styles.avatarImage}
                    source={{ uri: avatar }}
                    resizeMode="cover"
                  />
                ) : null}
                <Pressable style={styles.addIconContainer} onPress={pickImage}>
                  <AntDesign
                    style={avatar ? styles.deleteIcon : styles.addIcon}
                    name="pluscircleo"
                    size={24}
                  />
                </Pressable>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <Formik
                validationSchema={RegisterSchema}
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={(values, actions) => {
                  setUser(values);
                  if (user) {
                    actions.resetForm();
                    handleSignUp();
                    // navigation.navigate("Home");
                  }
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
                          handleBlur("username");
                          setIsUserFocus(false);
                        }}
                        onFocus={() => setIsUserFocus(true)}
                        type={
                          !isUserFocus
                            ? null
                            : errors.username && touched.username
                            ? "ERROR"
                            : "TERTIARY"
                        }
                      />
                      {errors.username && touched.username ? (
                        <Text style={styles.errors}>{errors.username}</Text>
                      ) : null}
                    </View>
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
                          handleBlur("email");
                          Platform.OS === "ios"
                            ? null
                            : setVerticalOffset(verticalOffsetDefault);
                        }}
                        onFocus={() => {
                          setIsEmailFocus(true);
                          Platform.OS === "ios"
                            ? null
                            : setVerticalOffset(-185);
                        }}
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
                  onPress={() => navigation.navigate("LoginScreen")}
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
    // overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  deleteIcon: {
    color: "#BDBDBD",
    transform: [{ rotate: "45deg" }],
  },
  addIcon: {
    color: "#FF6C00",
  },
  addIconContainer: {
    position: "absolute",
    right: -12,
    top: 82,
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

export default RegistrationScreen;
