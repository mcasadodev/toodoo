import React, { useState } from "react";

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => localStorage.getItem("id"));
  return (
    <UserContext.Provider
      value={{
        jwt,
        setJWT,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
