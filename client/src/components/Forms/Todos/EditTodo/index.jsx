import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import FileBase from "react-file-base64";

import { editTodo } from "api/todos.api";

import TodosContext from "context/TodosContext";
import { useUser } from "hooks/useUser";

import styles from "../../form.module.css";

const EditTodo = () => {
  const { setTodos, currentTodo } = useContext(TodosContext);
  const { user } = useUser();

  const params = useParams();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: currentTodo.title,
    description: currentTodo.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todoData, params.id, setTodos, user);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  return (
    <>
      <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className={styles.form_title}>Edit Todo</h6>
        <div className={styles.container}>
          <input
            className={styles.inputField}
            id="titleInput"
            type="text"
            name="title"
            value={todoData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            className={styles.inputField}
            id="descriptionInput"
            type="text"
            name="description"
            value={todoData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button className={styles.blue_button}>Edit Todo</button>
        </div>
      </form>
    </>
  );
};

export default EditTodo;
