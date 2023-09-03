import { useFonts } from "expo-font";

import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import Home from "./src/Screens/Home";
import CommentsScreen from "./src/Screens/CommentsScreen";
import MapScreen from "./src/Screens/MapScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import ButtonGoBack from "./src/components/ButtonGoBack/ButtonGoBack";

const MainStack = createStackNavigator();

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
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: "Коментарі",
            headerLeft: () => <ButtonGoBack />,
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              color: "#212121",
            },
            headerStyle: {
              boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 0.3,
              borderBottomColor: "#B3B3B3",
            },
          }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Карти",
            headerLeft: () => <ButtonGoBack />,
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              color: "#212121",
            },
            headerStyle: {
              boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 0.3,
              borderBottomColor: "#B3B3B3",
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
