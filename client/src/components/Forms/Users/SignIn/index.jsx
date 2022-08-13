import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { createTodo } from "../../../api/todos.api";

import styles from "../../form.module.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //singIn(userData);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //const clearForm = () => {};

  return (
    <>
      <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className={styles.form_title}>Sign In</h6>
        <div className={styles.container}>
          <input
            className={styles.inputField}
            id="emailInput"
            type="text"
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
