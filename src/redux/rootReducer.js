import { createSlice } from "@reduxjs/toolkit";
import { authSignUpUser, authSignInUser, authSingOutUser } from "./operations";
import { Alert } from "react-native";

const initialState = {
  userId: null,
  username: null,
  stateChange: false,
  email: null,
  avatar: null,
};

export const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateChanged: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      stateChange: true,
      avatar: payload.avatar,
    }),
    addUser: (state, { payload }) => {
      state.userId = payload.uid;
      state.username = payload.displayName;
      state.email = payload.email;
      state.avatar = payload.photoURL;
    },
  },
  extraReducers: (builder) =>
    builder
      // .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
      //   console.log("thunk:", payload);
      //   state.userId = payload.uid;
      //   state.username = payload.displayName;
      //   state.email = payload.mail;
      //   state.avatar = payload.photoURL;
      //   console.log("authSignUpUser", payload.mail);
      // })
      // .addCase(authSignUpUser.rejected, () => {
      //   Alert.alert("Wrong credentials SignUp");
      // })
      .addCase(authSignInUser.fulfilled, () => {
        // .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        // state.userId = payload.uid;
        // state.username = payload.displayName;
        // state.email = payload.email;
        // state.avatar = payload.photoURL;
      })
      .addCase(authSignInUser.rejected, () => {
        Alert.alert("Wrong credentials SignIn");
      })
      .addCase(authSingOutUser.fulfilled, (state) => {
        state.userId = null;
        state.username = null;
        state.stateChange = false;
        state.email = null;
        state.avatar = null;
      }),
});

export const rootReducer = postSlice.reducer;
export const { addUser } = postSlice.actions;
export const onStateChange = postSlice.actions.authStateChanged;
