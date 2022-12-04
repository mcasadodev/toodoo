import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { getPanels } from "api/panels.api";
import TodosContext from "context/TodosContext";

import Panel from "./Panel";

import styles from "./panelsList.module.css";

const PanelsList = () => {
  const { panels, setPanels, setIsPanelSelected, setMessages, setErrors } =
    useContext(TodosContext);

  useEffect(() => {
    setIsPanelSelected(false);
    getPanels(setPanels);
  }, [setIsPanelSelected, setPanels]);

  useEffect(() => {
    setMessages([]);
    setErrors([]);
  }, [setMessages, setErrors]);

  return (
    <div className={styles.container}>
      {!panels.length ? (
        <h6 className={styles.title}>You have no panels for now</h6>
      ) : (
        <>
          <h6 className={styles.title}>My Panels</h6>
          {panels.map((panel) => (
            <Panel key={panel.id} panel={panel} setPanels={setPanels} />
          ))}
        </>
      )}

      <Link className={styles.link} to="/create-panel">
        <div>New panel</div>
      </Link>
    </div>
  );
};

export default PanelsList;
