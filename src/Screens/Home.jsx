import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router";

import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { onStateChange } from "../redux/rootReducer";
import { auth } from "../../config";

export const Home = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const updateInfo = {
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(onStateChange(updateInfo));
      }
    });
  }, []);
  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
