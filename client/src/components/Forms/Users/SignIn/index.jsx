import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import StaticContext from "context/StaticContext";
import { useUser } from "hooks/useUser";
import { signIn } from "api/users.api";

import styles from "../../form.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import TodosContext from "context/TodosContext";

const SignIn = () => {
  //const staticContext = useContext(StaticContext);
  const { setJWT, setUserName, isLogged } = useUser();
  const { setMessages, setErrors } = useContext(TodosContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLogged) navigate("/panels-list");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(userData, setJWT, setUserName, setMessages, setErrors);
    // localStorage.setItem("user-email", userData.email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setMessages([]);
    setErrors([]);
  }, [setMessages, setErrors]);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
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
