import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkILJ55qWyeIT4DGee5SuMXI9geXuJU1o",
  authDomain: "reminder-3417a.firebaseapp.com",
  projectId: "reminder-3417a",
  storageBucket: "reminder-3417a.appspot.com",
  messagingSenderId: "854682328201",
  appId: "1:854682328201:web:541e5edd18775b15397a58",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
