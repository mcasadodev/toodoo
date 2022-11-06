import React, { useState } from "react";

const TodosContext = React.createContext({});

export function TodosContextProvider({ children }) {
  const [panels, setPanels] = useState([]);
  const [todos, setTodos] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [messages, setMessages] = useState([]);

  return (
    <TodosContext.Provider
      value={{
        panels,
        setPanels,
        todos,
        setTodos,
        currentTodo,
        setCurrentTodo,
        members,
        setMembers,
        messages,
        setMessages,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export default TodosContext;
