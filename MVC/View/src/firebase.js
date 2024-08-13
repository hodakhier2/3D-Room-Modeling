// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWBcpQUo2azuHVOqI1XWZVad8ltChgST0",
    authDomain: "interior-aesthetic-a9f6a.firebaseapp.com",
    projectId: "interior-aesthetic-a9f6a",
    storageBucket: "interior-aesthetic-a9f6a.appspot.com",
    messagingSenderId: "794969192676",
    appId: "1:794969192676:web:1eb85c2b0e91e9be4f14f1",
    measurementId: "G-XJL7FKE5QM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
