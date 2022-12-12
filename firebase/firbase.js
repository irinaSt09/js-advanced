// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0tD1jeGxQpJ6x1VK6-BKv6dZ12O2o5lQ",
  authDomain: "tic-tac-toe-a0f2f.firebaseapp.com",
  projectId: "tic-tac-toe-a0f2f",
  storageBucket: "tic-tac-toe-a0f2f.appspot.com",
  messagingSenderId: "1020026501154",
  appId: "1:1020026501154:web:045b986e4bd1611f0a727b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();