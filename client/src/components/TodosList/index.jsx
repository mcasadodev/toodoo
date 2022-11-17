import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getTodos } from "api/todos.api";
import TodosContext from "context/TodosContext";

import Notification from "components/Notification";
import Todo from "./Todo";

import styles from "./todosList.module.css";
import { getPanel } from "api/panels.api";

const TodosList = () => {
  const {
    setIsPanelSelected,
    currentPanel,
    setCurrentPanel,
    todos,
    setTodos,
    messages,
  } = useContext(TodosContext);

  const params = useParams();

  useEffect(() => {
    setIsPanelSelected(true);
    getTodos(params.id, setTodos, currentPanel, setCurrentPanel);
    getPanel(params.id, setCurrentPanel);
    console.log(currentPanel);
  }, [params.id]);

  return (
    <>
      {messages.map((message) => (
        <Notification text={message.text} />
      ))}
      {!todos.length ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodosList;
