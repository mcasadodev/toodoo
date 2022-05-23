import React from "react";
import { useSelector } from "react-redux";

import Todo from "./Todo";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
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
