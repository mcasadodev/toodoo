import React, { useContext } from "react";
import { Link } from "react-router-dom";

import TodosContext from "context/TodosContext";

//import { useUser } from "hooks/useUser";

import styles from "./aside.module.css";

const Aside = () => {
  //const { isLogged, logout } = useUser();

  const { panels } = useContext(TodosContext);

  console.log("DDDDDD: " + panels);

  let panelName = "Panel name";

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
          <Link to="/1/tasks-list">
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
          <li key={item.id}>
            <Link to="">{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
