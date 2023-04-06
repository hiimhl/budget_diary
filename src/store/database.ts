import { getAuthData, getDBStore } from "../my-firebase";
import { store } from "./reducer";
import { setDoc, doc, getDoc } from "firebase/firestore";

// Get user Information
export interface IUser {
  uid: null | string;
  displayName: string | null;
}

export let userInfo: IUser = {
  uid: null,
  displayName: null,
};

getAuthData.onAuthStateChanged((user) => {
  if (user) {
    userInfo = user;
  }
});

// Save the value to Firebase when state changes
store.subscribe(async () => {
  const state = store.getState();
  if (userInfo.uid) {
    await setDoc(doc(getDBStore, "data", userInfo.uid), { state });
  }
});
