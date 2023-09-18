import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0AgZpfi986xV5FY70vyPjGw1OBv7zUho",
  authDomain: "compass-sales-25f9a.firebaseapp.com",
  projectId: "compass-sales-25f9a",
  storageBucket: "compass-sales-25f9a.appspot.com",
  messagingSenderId: "174576478353",
  appId: "1:174576478353:web:de80043f84e6b84292b730",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
