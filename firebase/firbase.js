export const firebaseConfig = {
  apiKey: "AIzaSyB0tD1jeGxQpJ6x1VK6-BKv6dZ12O2o5lQ",
  authDomain: "tic-tac-toe-a0f2f.firebaseapp.com",
  projectId: "tic-tac-toe-a0f2f",
  storageBucket: "tic-tac-toe-a0f2f.appspot.com",
  messagingSenderId: "1020026501154",
  appId: "1:1020026501154:web:045b986e4bd1611f0a727b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

document.getElementById('submit').addEventListener('click', register);

export function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  auth.createUserWithEmailAndPassword(email, password)
  .then(function(){
    var usr = auth.currentUser;
    var database_ref = database.ref()

    var user_data = {
      email : email,
      password : password
    }

    database_ref.child('users/' + usr.uid).set(user_data)
  })
  .catch(function(err){
    alert(err.message);
  })
}