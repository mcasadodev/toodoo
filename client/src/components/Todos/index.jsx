import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Todo from "./Todo";

const Todos = ({ func }) => {
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    func();
  }, [func, todos]);

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
