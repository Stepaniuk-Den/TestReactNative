import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <View style={styles.imageThumb}>
          <Image
            style={styles.image}
            source={require("../../assets/images/testForest.png")}
          />
          <View style={styles.imageCamera}>
            <FontAwesome name="camera" size={24} color="#bdbdbd" />
          </View>
        </View>
        <Text style={styles.imageText}>Завантажте фото</Text>
        <CustomInput
          name="title"
          placeholder="Назва..."
          placeholderTextColor="#bdbdbd"
          // value={title}
          // onChangeText={handleChange("title")}
          // onChangeText={(value)=> setTitle(value)}
          type="INACTIVE"
        />
        <View style={styles.location}>
          <CustomInput
            name="location"
            placeholder="Місцевість..."
            placeholderTextColor="#bdbdbd"
            // value={location}
            // onChangeText={handleChange("location")}
            type="INACTIVE_MAP"
          />
          <Pressable style={styles.locationIcon}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </Pressable>
        </View>
        <CustomButton
          text="Опубліковати"
          // onPress={}
          type="INACTIVE"
        />
        <View style={styles.iconTrash}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  iconTrash: {
    position: "absolute",
    bottom: 32,
    // right: "50%",
    left: "45%",
    elevation: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
  },
  imageThumb: {
    position: "relative",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    width: "100%",
    height: 240,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    // resizeMode: "stretch",
    // resizeMode: "contain",
  },
  imageCamera: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    marginTop: 8,
    color: "#bdbdbd",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  location: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    top: "45%",
    left: 0,
  },
});

export default CreatePostsScreen;
