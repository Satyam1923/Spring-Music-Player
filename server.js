import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAKvyMHUmpkGyBVzTrZhOk1D4VyK6SvTs8",
  authDomain: "spring-music-player.firebaseapp.com",
  projectId: "spring-music-player",
  storageBucket: "spring-music-player.appspot.com",
  messagingSenderId: "579117504147",
  appId: "1:579117504147:web:d44352eed83937adf4df66",
  measurementId: "G-8QGTEQDTY8"
}
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

function login () {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    alert('User Logged In!!')

  })
  .catch(function(error) {
    var error_message = error.message
    alert(error_message)
  })
}