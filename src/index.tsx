import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import {
  blueTheme,
  greenTheme,
  rainbowTheme,
  roseTheme,
  vividTheme,
} from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={roseTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
