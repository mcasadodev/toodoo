import React from "react";

import StaticContext from "context/StaticContext";
import { UserContextProvider } from "context/UserContext";

import "main.css";
import Wrapper from "components/Wrapper";

const App = () => {
  return (
    <>
      <StaticContext.Provider value={{ key: "value" }}>
        <UserContextProvider>
          <Wrapper />
        </UserContextProvider>
      </StaticContext.Provider>
    </>
  );
};

export default App;
