import React, { useState } from "react";

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  function check_cookie_name(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
  }

  const [jwt, setJWT] = useState(check_cookie_name("token"));

  return (
    <UserContext.Provider
      value={{
        jwt,
        setJWT,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
