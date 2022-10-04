import { useContext, useCallback } from "react";

import Context from "context/UserContext";

export const useUser = () => {
  const { jwt, setJWT, user, setUser } = useContext(Context);

  const logout = useCallback(() => {
    setJWT(null);
    setUser("");
    console.log("logout");
    localStorage.removeItem("token");
  }, [setJWT, setUser]);

  return {
    isLogged: Boolean(jwt),
    jwt,
    setJWT,
    user,
    setUser,
    logout,
  };
};
