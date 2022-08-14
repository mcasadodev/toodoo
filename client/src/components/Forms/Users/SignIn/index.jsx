import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//import StaticContext from "context/StaticContext";
import UserContext from "context/UserContext";
import { useUser } from "hooks/useUser";
import { signIn } from "api/users.api";

import styles from "../../form.module.css";
import { useEffect } from "react";

const SignIn = () => {
  //const staticContext = useContext(StaticContext);
  const { setJWT } = useContext(UserContext);
  const { isLogged, setUser } = useUser();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(userData, setJWT);
    setUser(userData.email);
    localStorage.setItem("user-email", userData.email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //const clearForm = () => {};

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h6 className={styles.form_title}>Sign In</h6>
        <div className={styles.container}>
          <input
            className={styles.inputField}
            id="emailInput"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className={styles.inputField}
            id="passwordInput"
            type="password"
            name="password"
            value={userData.message}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className={styles.blue_button}>Sign In</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
