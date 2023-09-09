import { auth } from "../../config";
// import { Alert } from "react-native";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

// export const authSignUpUser = createAsyncThunk(
//   "auth/signUpUser",
//   async ({ username, email, password, avatar }, thunkApi) => {
//     console.log("after", email);
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       console.log("after update", email);
//       await updateProfile(auth.currentUser, {
//         displayName: username,
//         photoURL: avatar,
//       });
//       console.log("before update", email);
//       const { uid, displayName, mail, photoURL } = auth.currentUser;
//       console.log(auth.currentUser);
//       return { uid, displayName, mail, photoURL };
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const authSignInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, thunkApi) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // const { uid, displayName, photoURL } = auth.currentUser;
      // console.log("auth.currentUser SignIn", auth.currentUser);
      // return { uid, displayName, email, photoURL };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authSingOutUser = createAsyncThunk(
  "auth/singOutUser",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
      ``;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
