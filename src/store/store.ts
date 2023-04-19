import { getFirestore } from "firebase/firestore";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const middleware = [thunk.withExtraArgument(getFirestore)];
export const store = createStore(reducer, applyMiddleware(...middleware));
