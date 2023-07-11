// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbhb8Ikmr3Q4XwN5I7H3PnR4OMB9EGocA",
  authDomain: "workman-e7694.firebaseapp.com",
  databaseURL: "https://workman-e7694-default-rtdb.firebaseio.com",
  projectId: "workman-e7694",
  storageBucket: "workman-e7694.appspot.com",
  messagingSenderId: "847252257780",
  appId: "1:847252257780:web:18e54f4c8f3227eec597a1",
  measurementId: "G-L1R3XB6T9F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);