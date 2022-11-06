import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { createPanel, getPanels } from "api/panels.api";

import TodosContext from "context/TodosContext";

import styles from "../../form.module.css";
import { useEffect } from "react";

const CreatePanel = () => {
  const { setPanels } = useContext(TodosContext);

  const navigate = useNavigate();

  const [panelData, setPanelData] = useState({
    title: "",
    //description: "",
  });

  useEffect(() => {
    getPanels(setPanels);
  }, [setPanels]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPanel(panelData, setPanels);
    navigate("/panels-list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPanelData({ ...panelData, [name]: value });
  };

  //const clearForm = () => {};

  return (
    <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <h6 className={styles.form_title}>Create Panel</h6>
      <div className={styles.container}>
        <input
          className={styles.inputField}
          id="nameInput"
          type="text"
          name="name"
          value={panelData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {/* <input
          className={styles.inputField}
          id="descriptionInput"
          type="text"
          name="description"
          value={todoData.description}
          onChange={handleChange}
          placeholder="Description"
        /> */}
        <button className={styles.blue_button}>Create Panel</button>
      </div>
    </form>
  );
};

export default CreatePanel;
