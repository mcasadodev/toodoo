import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { getPanels } from "api/panels.api";
import TodosContext from "context/TodosContext";

import Panel from "./Panel";

import styles from "./panelsList.module.css";

const PanelsList = () => {
  const { panels, setPanels, setIsPanelSelected } = useContext(TodosContext);

  useEffect(() => {
    setIsPanelSelected(false);
    getPanels(setPanels);
  }, [setIsPanelSelected, setPanels]);

  return (
    <>
      <h6>My Panels</h6>

      {!panels.length ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {panels.map((panel) => (
            <Panel key={panel.id} panel={panel} setPanels={setPanels} />
          ))}
        </div>
      )}

      <Link to="/create-panel">
        <div>Add new panel</div>
      </Link>
    </>
  );
};

export default PanelsList;
