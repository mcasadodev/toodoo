import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Context from "context/UserContext";

export const useUser = () => {
  const { jwt, setJWT, userName, setUserName, users, setUsers } =
    useContext(Context);
  const navigate = useNavigate();

  // const logout = useCallback(() => {
  //   setJWT(null);
  //   //setUser("");
  //   navigate("/");
  //   //localStorage.removeItem("token");
  // }, [setJWT, navigate]);

  const logoutUseUser = () => {
    setJWT(null);
    setUserName("");
    navigate("/");
    localStorage.removeItem("current-panel");
  };

  return {
    isLogged: Boolean(jwt),
    jwt,
    setJWT,
    logoutUseUser,
    userName,
    setUserName,
    users,
    setUsers,
  };
};
