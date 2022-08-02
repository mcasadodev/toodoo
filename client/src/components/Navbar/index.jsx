import React from "react";
import { Link } from "react-router-dom";

import logo from "../../img/logo.png";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={`${styles.d_flex} ${styles.navbar}`}>
      <div className={styles.d_flex}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.title}>TaskTodo</h1>
      </div>
      <nav>
        <ul className={styles.d_flex}>
          <li>
            <Link to="/">My List</Link>
          </li>
          <li>
            <Link to="/create-todo">Create Todo</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
