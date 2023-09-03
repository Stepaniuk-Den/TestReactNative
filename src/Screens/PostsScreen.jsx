import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Post from "../components/Post/Post";

const PostsScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <View style={styles.userAvatar}>
          <Image
            style={styles.userImage}
            source={require("../../assets/images/testAvatar.png")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>userName</Text>
          <Text style={styles.userEmail}>email</Text>
        </View>
      </View>
      <Post loc={"Ivano-Frankivs'k Region, Ukraine"} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  userImage: {
    width: 60,
    height: 60,
    // resizeMode: "stretch",
    // resizeMode: "contain",
    // resizeMode: "cover",
  },

  userData: {
    marginHorizontal: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
  },
});

export default PostsScreen;
