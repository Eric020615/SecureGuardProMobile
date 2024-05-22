// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Env } from "@env";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Env.API_KEY,
  authDomain: Env.AUTH_DOMAIN,
  projectId: Env.PROJECT_ID,
  storageBucket: Env.STORAGE_BUCKET,
  messagingSenderId: Env.MESSAGING_SENDER_ID,
  appId: Env.APP_ID,
  measurementId: Env.MEASUREMENT_ID
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

export default { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, FIREBASE_ANALYTICS }