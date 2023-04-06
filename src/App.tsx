import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/reducer";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global-style";
import Router from "./Router";
import { IState } from "./store/actions";
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
    <Provider store={store}>
      <ThemeProvider theme={getTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
