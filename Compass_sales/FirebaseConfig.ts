import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0AgZpfi986xV5FY70vyPjGw1OBv7zUho",
  authDomain: "compass-sales-25f9a.firebaseapp.com",
  projectId: "compass-sales-25f9a",
  storageBucket: "compass-sales-25f9a.appspot.com",
  messagingSenderId: "174576478353",
  appId: "1:174576478353:web:de80043f84e6b84292b730",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_BD = getFirestore(FIREBASE_APP);
