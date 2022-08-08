import React, { useEffect, useContext } from "react";

import Todo from "./Todo";

import { getTodos } from "../../api/todos.api";
import TodosContext from "../../context/TodosContext";

import styles from "./todos.module.css";

const Todos = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(
    function () {
      getTodos(setTodos);
    },
    [setTodos]
  );

  return (
    <>
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

export default Todos;
