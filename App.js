import "react-native-gesture-handler";
import React from "react";
import { useFonts } from "expo-font";

import { Home } from "./src/Screens/Home";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
