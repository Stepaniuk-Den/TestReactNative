import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";

import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const MainStack = createStackNavigator();

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-150}
      >
        <View style={styles.root}>
          <ImageBackground
            style={styles.image}
            source={require("./assets/images/PhotoBG.png")}
          >
            {!isRegistered ? <RegistrationScreen /> : <LoginScreen />}
          </ImageBackground>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

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
});
