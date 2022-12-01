import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { getTodos } from "api/todos.api";
import TodosContext from "context/TodosContext";

import Todo from "./Todo";

import styles from "./todosList.module.css";
import { getPanel } from "api/panels.api";

const TodosList = () => {
  const { setIsPanelSelected, currentPanel, setCurrentPanel, todos, setTodos } =
    useContext(TodosContext);

  const params = useParams();

  useEffect(() => {
    setIsPanelSelected(true);
    getTodos(params.id, setTodos, currentPanel, setCurrentPanel);
    getPanel(params.id, setCurrentPanel);
  }, [params.id]);

  return (
    <>
      {!todos.length ? (
        <div className={styles.container_flex}>
          <h6 className={styles.title}>You have no tasks</h6>
          <Link className={styles.link} to="/create-todo">
            <div>New task</div>
          </Link>
        </div>
      ) : (
        <div className={styles.container_grid}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodosList;
