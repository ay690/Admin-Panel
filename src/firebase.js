import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "admin-project-60d0e.firebaseapp.com",
  projectId: "admin-project-60d0e",
  storageBucket: "admin-project-60d0e.appspot.com",
  messagingSenderId: "223721413846",
  appId: "1:223721413846:web:41a4e6ecc82cffa1a93d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
