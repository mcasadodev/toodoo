import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StaticContext from "./context/StaticContext";
import { TodosContextProvider } from "./context/TodosContext";

import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import CreateTodo from "./components/Forms/CreateTodo";
import EditTodo from "./components/Forms/EditTodo";

import "./main.css";

const App = () => {
  return (
    <>
      <Router>
        <StaticContext.Provider
          value={{
            todos: ["cc", "dd"],
          }}
        >
          <header>
            <Navbar />
          </header>
          <TodosContextProvider>
            <main>
              <div id="container">
                <Routes>
                  <Route path="/" element={<Todos />} />
                  <Route path="/create-todo" element={<CreateTodo />} />
                  <Route path="/edit/:id" element={<EditTodo />} />
                </Routes>
              </div>
            </main>
          </TodosContextProvider>
        </StaticContext.Provider>
      </Router>
    </>
  );
};

export default App;
