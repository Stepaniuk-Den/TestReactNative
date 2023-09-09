import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  // reducer,
  reducer: {
    auth: rootReducer,
  },
});
