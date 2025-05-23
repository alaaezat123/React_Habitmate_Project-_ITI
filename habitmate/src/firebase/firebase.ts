import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";

import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv18_Dtlzxg-Tz34hhXK4MqKrk_O3t5FU",
  authDomain: "habitmate-419b8.firebaseapp.com",
  projectId: "habitmate-419b8",
  storageBucket: "habitmate-419b8.appspot.com",
  messagingSenderId: "475928550999",
  appId: "1:475928550999:web:1ccc2e6bb58cb741db0d12",
  measurementId: "G-PLK4KHMLSC",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
