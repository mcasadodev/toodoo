import React from "react";

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
            <a href="#">Create Todo</a>
          </li>
          <li>
            <a href="#">Log out</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
