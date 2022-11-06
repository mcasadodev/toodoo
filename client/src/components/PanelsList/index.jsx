import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { getPanels } from "api/panels.api";
import { useUser } from "hooks/useUser";
import TodosContext from "context/TodosContext";

import Notification from "components/Notification";

import styles from "./panelsList.module.css";

const PanelsList = () => {
  const { panels, setPanels, messages } = useContext(TodosContext);

  const { isLogged } = useUser();
  console.log("TTTT: " + panels);

  useEffect(() => {
    getPanels(setPanels);
  }, [setPanels, isLogged]);

  return (
    <>
      {messages.map((message) => (
        <Notification text={message.text} />
      ))}

      <h6>My Panels</h6>

      {!panels.length ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {panels.map((panel) => (
            <div key={panel.id}>
              <h4>{panel.name}</h4>
            </div>
          ))}
          <Link to="/create-panel">
            <div>Add new panel</div>
          </Link>
        </div>
      )}
    </>
  );
};

export default PanelsList;
