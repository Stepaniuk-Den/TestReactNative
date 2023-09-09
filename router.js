import React from "react";
import { View, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./src/Screens/PostsScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import ButtonGoBack from "./src/components/ButtonGoBack/ButtonGoBack";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="RegistrationScreen">
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 90,
        },
      }}
      initialRouteName="Публікації"
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <AntDesign
                  name="appstore-o"
                  size={24}
                  color={focused ? "#FF6C00" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: () => <ButtonGoBack />,
          headerTitleStyle: {
            fontFamily: "Roboto-Meduim",
            color: "#212121",
          },
          headerStyle: {
            boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.iconPlus,
                  { backgroundColor: focused ? "#f6f6f6" : "#FF6C00" },
                ]}
              >
                <Feather
                  name={focused ? "trash-2" : "plus"}
                  size={24}
                  color={focused ? "#BDBDBD" : "#fff"}
                />
              </View>
            );
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#FF6C00" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconPlus: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 40,
  },
  logout: {
    width: 24,
    height: 24,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowLeft: {
    width: 24,
    height: 24,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
