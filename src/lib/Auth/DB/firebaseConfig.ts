import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5YTgghZo0BCdcu3VWdzYVVaTuTbmD_Xo",
  authDomain: "my-web-projects-f4592.firebaseapp.com",
  projectId: "my-web-projects-f4592",
  storageBucket: "my-web-projects-f4592.appspot.com",
  messagingSenderId: "634819098005",
  appId: "1:634819098005:web:3b2cd00fb51c482324b29c",
  measurementId: "G-Y180SQBM64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);