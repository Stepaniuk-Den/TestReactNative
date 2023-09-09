import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCZP9RFtcXr1_4nAhkIXnBX4U2zQChEnI",
  authDomain: "stden-rne-test-48852.firebaseapp.com",
  projectId: "stden-rne-test-48852",
  databaseURL:
    "https://stden-rne-test-48852-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "stden-rne-test-48852.appspot.com",
  messagingSenderId: "888777977051",
  appId: "1:888777977051:web:4584f6bc555ffd9d1570fe",
  measurementId: "G-PPSVYZE9VV",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
