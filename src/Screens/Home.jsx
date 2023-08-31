import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation, useRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  tabBarShowLabel: false,
  tabBarStyle: {
    paddingHorizontal: 75,
    // borderTopColor: "#808080",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    // justifyContent: "start",
    // alignItems: "start",
    height: 83,
    background: "#fff",
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

  const onLogout = () => (
    <TouchableOpacity
      style={styles.logout}
      onPress={() => navigation.navigate("Registration")}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );

  const onBack = () => (
    <TouchableOpacity
      style={styles.arrowLeft}
      onPress={() => navigation.navigate("Публікації")}
    >
      <Feather name="arrow-left" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: onLogout,
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
          headerLeft: onBack,
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
