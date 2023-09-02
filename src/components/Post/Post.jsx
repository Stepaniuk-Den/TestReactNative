import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// const Post = ({ title, locations, count }) => {
const Post = () => {
  const navigation = useNavigation();
  const count = 0;
  const locations = "Ivano-Frankivs'k Region, Ukraine";
  const title = "Ліс";

  return (
    <View>
      <View style={styles.postImageThumb}></View>
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postData}>
        <View style={styles.dataComments}>
          <Pressable
            style={styles.comments}
            onPress={() => {
              navigation.navigate("Comments");
            }}
          >
            <Feather
              style={styles.commentsIcon}
              name="message-circle"
              size={24}
              color="#BDBDBD"
            />
          </Pressable>
          <Text style={styles.count}>{count}</Text>
        </View>
        <View style={styles.dataLocations}>
          <Pressable
            style={styles.locationsIcon}
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.locations}>{locations}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  postImageThumb: {
    display: "flex",
    position: "relative",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    width: "100%",
    height: 240,
    marginTop: 32,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  postTitle: {
    paddingVertical: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  postData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  dataComments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 30,
  },
  comments: {
    height: 24,
    paddingRight: 6,
  },
  commentsIcon: {
    transform: [{ rotate: "270deg" }],
  },
  count: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  dataLocations: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    horizontalGap: 6,
  },
  locationsIcon: {
    paddingRight: 6,
  },
  locations: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
export default Post;
