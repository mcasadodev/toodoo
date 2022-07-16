import React, { useEffect, useContext } from "react";

import Todo from "./Todo";

import { fetchTodos } from "../../api";
import TodosContext from "../../context/TodosContext";

const Todos = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(
    function () {
      fetchTodos(setTodos);
    },
    [setTodos]
  );

  return (
    <>
      <h1>TODOS</h1>
      {!todos.length ? (
        <p>Loading...</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default Todos;
