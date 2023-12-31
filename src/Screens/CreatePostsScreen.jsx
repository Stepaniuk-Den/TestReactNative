import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { selectUserData } from "../redux/selectors";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config";

const CreatePostsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraActivated, setCameraActivated] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);

  const [title, setTitle] = useState(null);
  const [locations, setLocations] = useState(null);
  const [locationAddressCity, setLocationAddressCity] = useState(null);
  const [locationAddressCountry, setLocationAddressCountry] = useState(null);
  const [locationPhoto, setLocationPhoto] = useState(null);

  const isActive = capturedImage && title;
  const userData = useSelector(selectUserData);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        const latitude = currentLocation.coords.latitude;
        const longitude = currentLocation.coords.longitude;

        setLocationAddressCity(`${address[0].city}`);
        setLocationAddressCountry(`${address[0].country}`);
        setLocationPhoto({ latitude: latitude, longitude: longitude });
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setCapturedImage(uri);
    }
    setCameraActivated(false);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async () => {
    try {
      const response = await fetch(capturedImage);
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

  const uploadPost = async () => {
    try {
      const capturedImage = await saveImage();
      await addDoc(collection(db, "posts"), {
        userId: userData.userId,
        username: userData.username,
        capturedImage,
        title,
        // coords: coords.coords,
        locationPhoto,
        locationAddressCity,
        locationAddressCountry,
        date: Date.now().toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createPost = () => {
    if (!isActive) return;
    uploadPost();
    navigation.navigate("Публікації");
    deletePost();
  };

  const deletePost = () => {
    setCapturedImage(null);
    setTitle(null);
    setLocations(null);
  };

  const changePhoto = () => {
    setCapturedImage(null);
    setCameraActivated(true);
  };

  return (
    <>
      {cameraActivated ? (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name="camera-reverse"
                  size={36}
                  color="#bdbdbd"
                  style={{
                    marginBottom: 0,
                    marginRight: 16,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.root}>
            <View style={styles.imageThumb}>
              {capturedImage && (
                <Image style={styles.image} source={{ uri: capturedImage }} />
              )}
              <Pressable
                style={styles.imageCamera}
                onPress={() => setCameraActivated(true)}
              >
                <FontAwesome name="camera" size={24} color="#bdbdbd" />
              </Pressable>
            </View>
            {!capturedImage ? (
              <Text style={styles.imageText}>Завантажте фото</Text>
            ) : (
              <Text style={styles.imageText} onPress={changePhoto}>
                Редагувати фото
              </Text>
            )}
            <CustomInput
              name="title"
              placeholder="Назва..."
              placeholderTextColor="#bdbdbd"
              value={title}
              // onChangeText={handleChange("title")}
              onChangeText={(value) => setTitle(value)}
              type="INACTIVE"
            />
            <View style={styles.location}>
              <CustomInput
                name="locations"
                placeholder="Місцевість..."
                placeholderTextColor="#bdbdbd"
                value={`${locationAddressCity}, ${locationAddressCountry}`}
                type="INACTIVE_MAP"
              />
              <Pressable style={styles.locationIcon}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </Pressable>
            </View>
            <CustomButton
              text="Опубліковати"
              onPress={createPost}
              type={isActive ? "PRIMARY" : "INACTIVE"}
            />
            <View style={styles.trashContainer}>
              <Pressable style={styles.iconTrash} onPress={deletePost}>
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
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
  trashContainer: {
    display: "flex",
    position: "absolute",
    bottom: 32,
    left: 16,
    elevation: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  iconTrash: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
  },
  imageThumb: {
    display: "flex",
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
    height: "100%",
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
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 40,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default CreatePostsScreen;
