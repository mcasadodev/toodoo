import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { createTodo, getTodos } from "api/todos.api";

import TodosContext from "context/TodosContext";

import styles from "../../form.module.css";
import { useEffect } from "react";

const CreateTodo = () => {
  const { setTodos } = useContext(TodosContext);

  const params = useParams();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  });

  // ESTA MAL params.panelId HAY QUE SACARLO DE useTodo
  useEffect(() => {
    getTodos(1, setTodos);
  }, [setTodos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(todoData, setTodos);
    navigate(`/1/tasks-list`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  //const clearForm = () => {};

  return (
    <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <h6 className={styles.form_title}>Create Todo</h6>
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
        <button className={styles.blue_button}>Create Todo</button>
      </div>
    </form>
  );
};

export default CreateTodo;
