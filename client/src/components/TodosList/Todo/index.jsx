import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { deleteTodo } from "api/todos.api";
import TodosContext from "context/TodosContext";

import styles from "./todo.module.css";

const Todo = ({ todo, setTodos }) => {
  const { setCurrentTodo } = useContext(TodosContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    setCurrentTodo(todo);
    navigate(`/edit/${todo.id}`);
  };

  const handleDelete = () => {
    deleteTodo(todo, localStorage.getItem("current-panel"), setTodos);
  };

  useEffect(() => {
    let todo_card = document.getElementById(`${todo.id}`);

    let edit_btn = document.getElementById(`edit_btn_${todo.id}`);
    let delete_btn = document.getElementById(`delete_btn_${todo.id}`);

    todo_card.addEventListener("mouseover", () => {
      edit_btn.classList.remove("hidden");
      edit_btn.classList.add("show");
      delete_btn.classList.remove("hidden");
      delete_btn.classList.add("show");
    });
    todo_card.addEventListener("mouseout", () => {
      edit_btn.classList.remove("show");
      edit_btn.classList.add("hidden");
      delete_btn.classList.remove("show");
      delete_btn.classList.add("hidden");
    });
  }, [todo.id]);

  return (
    <div id={`${todo.id}`} className={styles.todoCard}>
      <header className={styles.header}></header>
      <h3 className={styles.title}>Title: {todo.title}</h3>
      <p>Description: {todo.description}</p>
      <p>Created: </p>
      <button
        id={`edit_btn_${todo.id}`}
        className={`hidden ${styles.blue_button}`}
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        id={`delete_btn_${todo.id}`}
        className={`hidden ${styles.red_button}`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
