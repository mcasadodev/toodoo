import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import StaticContext from "context/StaticContext";
import { TodosContextProvider } from "context/TodosContext";
import { UserContextProvider } from "context/UserContext";

import Navbar from "components/Navbar";

import Main from "components/Main";

import "main.css";

const App = () => {
  return (
    <>
      <Router>
        <StaticContext.Provider value={{ key: "value" }}>
          <UserContextProvider>
            <header>
              <Navbar />
            </header>
            <TodosContextProvider>
              <Main />
            </TodosContextProvider>
          </UserContextProvider>
        </StaticContext.Provider>
      </Router>
    </>
  );
};

export default App;
