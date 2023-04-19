import { Dispatch } from "redux";
import { getAuthData, getDBStore } from "../my-firebase";
import { store } from "./store";
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

// Get data from Firebase and put it into Redux State
export const getDataFromFirebase = async (dispatch: Dispatch) => {
  if (!userInfo.uid) {
    return;
  }
  try {
    const docRef = doc(getDBStore, "data", userInfo.uid);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      const getData = docData.data();
      const state = getData.state;
      dispatch({ type: "GET_DATA", data: state });
    }
  } catch (e) {
    console.log(e);
  }
};
