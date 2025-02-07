// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9lqK0mR4YMt4fLNT7pgmxk6OqtI-wvoE",
    authDomain: "my-ludo-f70ca.firebaseapp.com",
    projectId: "my-ludo-f70ca",
    storageBucket: "my-ludo-f70ca.firebasestorage.app",
    messagingSenderId: "212234536989",
    appId: "1:212234536989:web:0488ecb074989e98c91ef4",
    measurementId: "G-HYW341Y6BR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

