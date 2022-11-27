import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTodo, editTodo } from "api/todos.api";

import TodosContext from "context/TodosContext";

import styles from "../../form.module.css";

const EditTodo = () => {
  const { setTodos, currentTodo } = useContext(TodosContext);

  const params = useParams();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: currentTodo.title ?? "",
    description: currentTodo.description ?? "",
  });

  const localStorageCurrentPanel = localStorage.getItem("current-panel");

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todoData, params.id, localStorageCurrentPanel, setTodos);
    navigate(`/panel-${localStorageCurrentPanel}/tasks-list`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(currentTodo).length === 0) {
      getTodo(params.id, setTodoData);
    }
  }, [currentTodo, params.id]);

  return (
    <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
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
  );
};

export default EditTodo;
