import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  /* apiKey: "AIzaSyAkILJ55qWyeIT4DGee5SuMXI9geXuJU1o",
  authDomain: "reminder-3417a.firebaseapp.com",
  projectId: "reminder-3417a",
  storageBucket: "reminder-3417a.appspot.com",
  messagingSenderId: "854682328201",
  appId: "1:854682328201:web:541e5edd18775b15397a58", */
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  /* databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, */
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
