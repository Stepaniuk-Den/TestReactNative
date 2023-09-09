import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "../components/Post/Post";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../config";
import { useNavigation } from "@react-navigation/native";

const InitialPostsScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { username, email, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
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

  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <View style={styles.userAvatar}>
          <Image
            style={styles.userImage}
            source={{ uri: avatar }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>{username ? username : "Test"}</Text>
          <Text style={styles.userEmail}>
            {email ? email : "test@test.com"}
          </Text>
        </View>
      </View>
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
              page={false}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
  scrollview: {
    marginBottom: 90,
  },
});

export default InitialPostsScreen;
