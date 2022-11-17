import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import TodosContext from "context/TodosContext";

//import { useUser } from "hooks/useUser";

import styles from "./aside.module.css";

import { getPanel, getPanels } from "api/panels.api";

const Aside = () => {
  //const { isLogged, logout } = useUser();

  const { panels, setPanels, currentPanel } = useContext(TodosContext);

  useEffect(() => {
    getPanels(setPanels);
  }, [setPanels]);

  return (
    <aside>
      <h2>{currentPanel.name}</h2>
      <ul>
        <li>
          <Link to="/create-todo">
            <div>Create</div>
          </Link>
        </li>
        <li>
          <Link to={`/panel-${currentPanel.id}/members-list`}>
            <div>Members</div>
          </Link>
        </li>
        <li>
          <Link to={`#`}>
            <div>Settings</div>
          </Link>
        </li>
      </ul>
      <h3 className={styles.panel_name}>Views</h3>
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
      </ul>
      <h3 className={styles.panel_name}>
        <Link to={`/panels-list`}>My Panels</Link>
      </h3>
      <ul>
        {panels.map((item) => (
          <li key={item.id}>
            <Link to={`/panel-${item.id}/tasks-list`}>
              <div
                className={
                  item.id === parseInt(localStorage.getItem("current-panel"))
                    ? styles.focus
                    : ""
                }
              >
                {item.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
