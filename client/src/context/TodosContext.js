import React, { useState } from "react";

const TodosContext = React.createContext({});

export function TodosContextProvider({ children }) {
  const [panels, setPanels] = useState([]);
  const [currentPanel, setCurrentPanel] = useState({});
  //const [currentPanel, setCurrentPanel] = useState(() =>
  //  localStorage.getItem("current-panel")
  //);
  const [todos, setTodos] = useState([]);
  const [isPanelSelected, setIsPanelSelected] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <TodosContext.Provider
      value={{
        panels,
        setPanels,
        isPanelSelected,
        setIsPanelSelected,
        currentPanel,
        setCurrentPanel,
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
