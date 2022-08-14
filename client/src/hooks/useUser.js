import { useContext, useCallback } from "react";

import Context from "context/UserContext";

export const useUser = () => {
  const { jwt, setJWT, user, setUser } = useContext(Context);

  const logout = useCallback(() => {
    setJWT(null);
    setUser(null);
    localStorage.removeItem("token");
  }, [setJWT, setUser]);

  return {
    isLogged: Boolean(jwt),
    user,
    setUser,
    logout,
  };
};
