import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";

export default function App() {
  const isRegistered = false;
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/PhotoBG.png")}
      >
        {!isRegistered ? <RegistrationScreen /> : <LoginScreen />}
      </ImageBackground>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    backgroundColor: "#ffd",
    // width: "100%",
    // height: "100%",

    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    width: "100%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
});
