import React from "react";
import { Link } from "react-router-dom";

//import { useUser } from "hooks/useUser";

import styles from "./aside.module.css";

const Aside = () => {
  //const { isLogged, logout } = useUser();

  let panelName = "Panel name";
  let panels = ["Panel placeholder 1", "Panel placeholder 2"];

  return (
    <aside>
      <h2>{panelName}</h2>
      <ul>
        <li>
          <Link to="/create-todo">
            <div>Create</div>
          </Link>
        </li>
        <li>
          <Link to="">
            <div>Members</div>
          </Link>
        </li>
      </ul>
      <h3 className={styles.panel_name}>Views</h3>
      <ul>
        <li>
          <Link to="">
            <div>List</div>
          </Link>
        </li>
        <li>
          <Link to="">
            <div>Grid</div>
          </Link>
        </li>
      </ul>
      <h3 className={styles.panel_name}>Panels</h3>
      <ul>
        {panels.map((item) => (
          <li>
            <Link to="">{item}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
