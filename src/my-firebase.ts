import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import "firebase/database";
import { getDatabase } from "firebase/database";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.RREACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const myFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(myFirebase);

export const getAuthData = getAuth();
export const getDBStore = getFirestore(myFirebase);

// Save User Data
export let userInfo = { uid: "" };

getAuthData.onAuthStateChanged((user) => {
  if (user) {
    userInfo = user;
  }
});

export let userData = {};
if (userInfo.uid != "") {
  const docRef = doc(getDBStore, userInfo.uid, "data");

  userData = getDoc(docRef);
}
