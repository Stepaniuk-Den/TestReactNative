import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonGoBack } from "../components/ButtonGoBack/ButtonGoBack";
import ButtonLogOut from "../components/ButtonLogOut/ButtonLogOut";

const Tabs = createBottomTabNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  tabBarShowLabel: false,
  tabBarStyle: {
    boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
    borderTopWidth: 0.3,
    borderTopColor: "#b3b3b3",
    paddingHorizontal: 75,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 83,
    background: "#fff",
  },
  headerTitleStyle: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  headerStyle: {
    boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
    borderBottomWidth: 0.3,
    borderBottomColor: "#B3B3B3",
  },
};

const Home = () => {
  const navigation = useNavigation();
  const { params: values } = useRoute();
  // const [users, setUsers] = useState([
  //   { username: "", email: "", password: "", key: "" },
  // ]);

  // const addUser = (user) => {
  //   user.key = Math.random().toString();
  //   setUsers((currentUser) => {
  //     return [user, ...currentUser];
  //   });
  // };

  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: () => <ButtonLogOut path="Registration" />,
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
          // headerLeft: onBack,
          headerLeft: () => <ButtonGoBack path="Публікації" />,
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

export default Home;
