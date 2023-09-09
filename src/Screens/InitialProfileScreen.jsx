import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { nanoid } from "@reduxjs/toolkit";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ButtonLogOut from "../components/ButtonLogOut/ButtonLogOut";
import Post from "../components/Post/Post";
import { authSingOutUser } from "../redux/operations";
import { db } from "../../config";
import { query, collection, where, onSnapshot, doc } from "firebase/firestore";

const InitialProfileScreen = () => {
  const { username, avatar, userId } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setImg(avatar);
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/PhotoBG.png")}
      >
        <View style={styles.rootProfile}>
          <View style={styles.avatar}>
            <Image source={{ uri: img }} resizeMode="cover" />
            <Pressable style={styles.addIconContainer} onPress={pickImage}>
              <AntDesign
                style={img ? styles.deleteIcon : styles.addIcon}
                name="pluscircleo"
                size={24}
              />
            </Pressable>
          </View>
          <ButtonLogOut
            type={"profile"}
            path="Login"
            onPress={() => dispatch(authSingOutUser())}
          />
          <Text style={styles.title}>{username}</Text>
          <SafeAreaView style={styles.scrollview}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Post
                  capturedImage={item.capturedImage}
                  title={item.title}
                  locationPhoto={item.locationPhoto}
                  navigation={navigation}
                  locationAddressCity={item.locationAddressCity}
                  locationAddressCountry={item.locationAddressCountry}
                  postId={item.id}
                  likes={item.like}
                  page={true}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
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
  scrollview: {
    marginBottom: 90,
  },
});

export default InitialProfileScreen;
