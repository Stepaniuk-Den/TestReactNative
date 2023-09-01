import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomCamera from "../components/CustomCamera/CustomCamera";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraActivated, setCameraActivated] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
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

  return (
    //
    <>
      {cameraActivated ? (
        // <CustomCamera />
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
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  setCameraActivated(false);
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    console.warn(uri);
                  }
                }}
              >
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
              {/* <Image style={styles.image} source={uri} /> */}
              <Pressable
                style={styles.imageCamera}
                onPress={() => setCameraActivated(true)}
              >
                <FontAwesome name="camera" size={24} color="#bdbdbd" />
              </Pressable>
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
