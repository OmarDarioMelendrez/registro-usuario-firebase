import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDU7CZbbYvHURJs0Kh-OaXSjSJyGr9-zH0",
    authDomain: "prueba-react-4c455.firebaseapp.com",
    projectId: "prueba-react-4c455",
    storageBucket: "prueba-react-4c455.appspot.com",
    messagingSenderId: "110293671566",
    appId: "1:110293671566:web:e1699b7b18113b394273df"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()
const store = fire.firestore()

export {auth, store}