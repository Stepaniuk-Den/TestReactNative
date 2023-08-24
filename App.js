import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import useFonts from "expo-font";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/PhotoBG.png")}
      >
        {/* <StatusBar style="auto" /> */}
        <RegistrationScreen />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffd",
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
