import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Context from "context/UserContext";

export const useUser = () => {
  const { jwt, setJWT, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setJWT(null);
    setUser("");
    navigate("/");
    localStorage.removeItem("token");
  }, [setJWT, setUser, navigate]);

  return {
    isLogged: Boolean(jwt),
    jwt,
    setJWT,
    user,
    setUser,
    logout,
  };
};
