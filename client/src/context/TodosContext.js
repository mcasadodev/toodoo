import React, { useState } from "react";

const TodosContext = React.createContext({});

export function TodosContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, currentTodo, setCurrentTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export default TodosContext;
