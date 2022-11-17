import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getTodos } from "api/todos.api";
import { useUser } from "hooks/useUser";
import TodosContext from "context/TodosContext";

import Notification from "components/Notification";
import Todo from "./Todo";

import styles from "./todosList.module.css";
import { getPanel } from "api/panels.api";

const TodosList = () => {
  const { setIsPanelSelected, todos, setTodos, messages } =
    useContext(TodosContext);

  const { isLogged } = useUser();

  const params = useParams();

  useEffect(() => {
    setIsPanelSelected(true);
    getPanel(params.id);
    getTodos(params.id, setTodos);
  }, [params.id, setTodos, isLogged, setIsPanelSelected]);

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
