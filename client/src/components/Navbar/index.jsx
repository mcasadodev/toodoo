import React from "react";
import { Link } from "react-router-dom";

import { useUser } from "hooks/useUser";

import logo from "img/logo.png";
import styles from "./navbar.module.css";

import { logout } from "api/users.api";

const Navbar = () => {
  const { isLogged, logoutUseUser } = useUser();

  const logOut = () => {
    logout();
    logoutUseUser();
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.d_flex} ${styles.navbar}`}>
        <div className={styles.d_flex}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1 className={styles.title}>Todoo</h1>
        </div>
        <ul className={styles.d_flex}>
          {!isLogged && (
            <>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
          {isLogged && (
            <>
              {/*
              <li>
                <Link to={`/${currentPanel.id}/tasks-list`}>My List</Link>
              </li>
              <li>
                <Link to="/create-todo">Create Todo</Link>
              </li>
              */}
              <li>
                <button onClick={logOut}>Log Out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
