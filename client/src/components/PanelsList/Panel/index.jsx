import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./panel.module.css";

const Panel = ({ panel }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("current-panel", panel.id);
    navigate(`/panel-${panel.id}/tasks-list`);
  };

  useEffect(() => {
    let panel_card = document.getElementById(`${panel.id}`);
    panel_card.addEventListener("click", handleClick);
  });

  return (
    <div id={`${panel.id}`} className={styles.panelCard}>
      <header className={styles.header}></header>
      <h3 className={styles.name}>{panel.name}</h3>
    </div>
  );
};

export default Panel;
