import React, { useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { deleteTodo } from "api/todos.api";
import TodosContext from "context/TodosContext";

import { useUser } from "hooks/useUser";

import styles from "./todo.module.css";

const Todo = ({ todo, setTodos }) => {
  const { setCurrentTodo } = useContext(TodosContext);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleEdit = () => {
    setCurrentTodo(todo);
    navigate(`/edit/${todo.id}`);
  };

  const handleDelete = () => {
    deleteTodo(todo, setTodos, user);
  };

  return (
    <div className={styles.todoCard}>
      <h3 className={styles.title}>Title: {todo.title}</h3>
      <p>Creator: {todo.creator}</p>
      <p>Description: {todo.description}</p>
      <p>Created: </p>
      <button className={styles.blue_button} onClick={handleEdit}>
        Edit
      </button>
      <button className={styles.red_button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Todo;
