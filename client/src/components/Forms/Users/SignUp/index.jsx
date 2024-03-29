import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signUp } from "api/users.api";
import TodosContext from "context/TodosContext";

import styles from "../../form.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { setMessages, setErrors } = useContext(TodosContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(userData, setMessages, setErrors, navigate);
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
      <form action="" onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.container}>
          <input
            className={styles.inputField}
            id="nameInput"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          />
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
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            className={styles.inputField}
            id="confirmPasswordInput"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <button className={styles.blue_button}>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
