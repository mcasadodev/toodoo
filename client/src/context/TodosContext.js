import React, { useState } from "react";

const TodosContext = React.createContext({});

export function TodosContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

export default TodosContext;
