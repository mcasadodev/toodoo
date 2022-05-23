import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import reducer from "./reducers";
import App from "./App";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
