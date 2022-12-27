import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB0tD1jeGxQpJ6x1VK6-BKv6dZ12O2o5lQ",
    authDomain: "tic-tac-toe-a0f2f.firebaseapp.com",
    projectId: "tic-tac-toe-a0f2f",
    storageBucket: "tic-tac-toe-a0f2f.appspot.com",
    messagingSenderId: "1020026501154",
    appId: "1:1020026501154:web:045b986e4bd1611f0a727b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

let formMessage = ref(database, 'register');

document.getElementById('submit').addEventListener('click', register);

export function register(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    const loginErrorMsg = document.getElementById("login-error-msg");

    if (password !== confirmPassword) {
        loginErrorMsg.style.opacity = 1;
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                sendMessage(email, password); 
                alert('You have successfully created an account.')
            })
            .catch((error) => {
                alert(error);
            });
    }
}

function sendMessage(email, password) {
    const accontsRef = push(formMessage);
    set(accontsRef, {
        email: email,
        password: password
    });
}

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