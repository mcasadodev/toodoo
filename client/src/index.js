import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
