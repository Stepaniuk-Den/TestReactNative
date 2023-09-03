import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import ButtonLogOut from "../components/ButtonLogOut/ButtonLogOut";
import Post from "../components/Post/Post";

const ProfileScreen = () => {
  const avatar = true;
  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/PhotoBG.png")}
      >
        <View style={styles.rootProfile}>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/images/testAvatar.png")}
              resizeMode="contain"
            />
            <View style={styles.addIconContainer}>
              <AntDesign
                style={avatar ? styles.deleteIcon : styles.addIcon}
                name="pluscircleo"
                size={24}
              />
            </View>
          </View>
          <ButtonLogOut type={"profile"} path="Login" />
          {/* <Text>{username}</Text> */}
          <Text style={styles.title}>Natali Romanova</Text>
          <ScrollView>
            <Post page={true} location={"Ukraine"} />
            <Post page={true} location={"Ukraine"} />
            <Post page={true} location={"Ukraine"} />
            <Post page={true} location={"Ukraine"} />
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
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
  rootProfile: {
    flex: 0.9,
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 100,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 92,
    // marginBottom: 17,
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
});

export default ProfileScreen;
