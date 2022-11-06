import React, { useEffect, useContext } from "react";

import { getTodos } from "api/todos.api";
import { useUser } from "hooks/useUser";
import TodosContext from "context/TodosContext";

import Notification from "components/Notification";
import Todo from "./Todo";

import styles from "./todosList.module.css";

const TodosList = () => {
  const { todos, setTodos, messages } = useContext(TodosContext);

  const { isLogged } = useUser();

  console.log("CCCCCC: " + todos);

  useEffect(() => {
    getTodos(1, setTodos);
  }, [setTodos, isLogged]);

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
