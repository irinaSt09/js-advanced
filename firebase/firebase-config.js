// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

firebase.auth().createUserWithEmailAndPassword( email, password)
    .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
    // An error happened.
});