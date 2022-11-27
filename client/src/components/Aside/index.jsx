import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import TodosContext from "context/TodosContext";

//import { useUser } from "hooks/useUser";

import styles from "./aside.module.css";

import { getPanels } from "api/panels.api";

const Aside = () => {
  //const { isLogged, logout } = useUser();

  const { panels, setPanels, currentPanel } = useContext(TodosContext);

  useEffect(() => {
    getPanels(setPanels);
  }, [setPanels]);

  return (
    <aside>
      <h2>{currentPanel.name}</h2>
      <hr />
      <ul>
        <li>
          <Link to="/create-todo">
            <div className={styles.link_create}>New task</div>
          </Link>
        </li>
        {/* <li>
          <Link to={`/panel-${currentPanel.id}/members-list`}>
            <div>Members</div>
          </Link>
        </li>
        <li>
          <Link to={`#`}>
            <div>Settings</div>
          </Link>
        </li> */}
      </ul>
      {/* <h3 className={styles.panel_name}>Views</h3>
      <ul>
        <li>
          <Link to="#">
            <div>List</div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div>Grid</div>
          </Link>
        </li>
      </ul> */}

      <Link to={`/panels-list`}>
        <h3 className={styles.panel_name}>My Panels</h3>
      </Link>

      <ul>
        {panels.map((item) => (
          <li key={item.id}>
            <Link to={`/panel-${item.id}/tasks-list`}>
              <div
                className={`${styles.panel_line} 
                ${
                  item.id === parseInt(localStorage.getItem("current-panel"))
                    ? styles.focus
                    : ""
                }`}
              >
                <h6>{item.name}</h6>
                {/* <div className={styles.trash}></div> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
