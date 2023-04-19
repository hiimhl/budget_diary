import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global-style";
import Router from "./Router";
import { IState } from "./store/actions-type";
import {
  blueTheme,
  greenTheme,
  rainbowTheme,
  roseTheme,
  vividTheme,
} from "./theme";
import { getDataFromFirebase } from "./store/database";
import { getAuthData } from "./my-firebase";

function App() {
  const [getTheme, setGetTheme] = useState(blueTheme);
  const userTheme = useSelector((state: IState) => state.user.theme);
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  // User Login
  useEffect(() => {
    getAuthData.onAuthStateChanged((user) =>
      user ? setUser(true) : setUser(false)
    );
  }, [getAuthData]);

  // Get the user data
  useEffect(() => {
    getDataFromFirebase(dispatch);
  }, [user]);

  // Set the Theme
  useEffect(() => {
    switch (userTheme) {
      case "GREEN":
        return setGetTheme(greenTheme);
      case "BLUE":
        return setGetTheme(blueTheme);
      case "ROSE":
        return setGetTheme(roseTheme);
      case "RAINBOW":
        return setGetTheme(rainbowTheme);
      case "VIVID":
        return setGetTheme(vividTheme);
      default:
        return setGetTheme(blueTheme);
    }
  }, [userTheme]);

  return (
    <ThemeProvider theme={getTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
