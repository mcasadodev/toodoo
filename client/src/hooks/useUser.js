import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Context from "context/UserContext";

export const useUser = () => {
  const { jwt, setJWT } = useContext(Context);
  const navigate = useNavigate();

  // const logout = useCallback(() => {
  //   setJWT(null);
  //   //setUser("");
  //   navigate("/");
  //   //localStorage.removeItem("token");
  // }, [setJWT, navigate]);

  const logoutUseUser = () => {
    setJWT(null);
    //setUser("");
    navigate("/");
    //localStorage.removeItem("token");
  };

  return {
    jwt,
    setJWT,
    isLogged: Boolean(jwt),
    logoutUseUser,
  };
};
