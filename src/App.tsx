import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global-style";
import Router from "./Router";
import { IState } from "./store";
import {
  blueTheme,
  greenTheme,
  rainbowTheme,
  roseTheme,
  vividTheme,
} from "./theme";

function App() {
  const [getTheme, setGetTheme] = useState(blueTheme);

  const userTheme = useSelector((state: IState) => state.user.theme);

  // Set the Theme
  useEffect(() => {
    switch (userTheme) {
      case "GREEN": {
        setGetTheme(greenTheme);
        break;
      }
      case "BLUE": {
        setGetTheme(blueTheme);
        break;
      }
      case "ROSE": {
        setGetTheme(roseTheme);
        break;
      }
      case "RAINBOW": {
        setGetTheme(rainbowTheme);
        break;
      }
      case "VIVID": {
        setGetTheme(vividTheme);
        break;
      }
      default:
        break;
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
