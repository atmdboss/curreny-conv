import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Merriweather", "serif"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
