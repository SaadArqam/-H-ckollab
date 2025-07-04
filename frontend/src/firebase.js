// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUPzmF1PL8rbADPlhuI59seE2F79JA5f0",
    authDomain: "hackollab.firebaseapp.com",
    projectId: "hackollab",
    appId: "1:537502557357:web:37a28e520e021942c21224",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

