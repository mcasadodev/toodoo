import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "hooks/useUser";
import { TodosContextProvider } from "context/TodosContext";

import { checkIsLogged } from "api/users.api";

import Navbar from "components/Navbar";
import Main from "components/Main";

//import styles from "./wrapper.module.css";

const Wrapper = () => {
  const navigate = useNavigate();
  const { isLogged, setJWT } = useUser();

  useEffect(() => {
    checkIsLogged(setJWT, navigate);
  }, [setJWT, navigate, isLogged]);

  return (
    <>
      <Navbar />
      <TodosContextProvider>
        <Main />
      </TodosContextProvider>
    </>
  );
};

export default Wrapper;
