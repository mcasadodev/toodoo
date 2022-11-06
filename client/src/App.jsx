import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import StaticContext from "context/StaticContext";
import { UserContextProvider } from "context/UserContext";

import "main.css";
import Wrapper from "components/Wrapper";

const App = () => {
  return (
    <>
      <Router>
        <StaticContext.Provider value={{ key: "value" }}>
          <UserContextProvider>
            <Wrapper />
          </UserContextProvider>
        </StaticContext.Provider>
      </Router>
    </>
  );
};

export default App;
