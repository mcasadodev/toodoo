import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StaticContext from "context/StaticContext";
import { TodosContextProvider } from "context/TodosContext";
import { UserContextProvider } from "context/UserContext";

import Navbar from "components/Navbar";
import Aside from "components/Aside";
import TodosList from "components/TodosList";
import SignIn from "components/Forms/Users/SignIn";
import SignUp from "components/Forms/Users/SignUp";
//import LogOut from "components/Forms/Users/LogOut";
import CreateTodo from "components/Forms/Todos/CreateTodo";
import EditTodo from "components/Forms/Todos/EditTodo";

import "main.css";

const App = () => {
  return (
    <>
      <Router>
        <StaticContext.Provider value={{ key: "value" }}>
          <UserContextProvider>
            <header>
              <Navbar />
            </header>
            <TodosContextProvider>
              <div id="container">
                <Aside />
                <main>
                  <Routes>
                    {/* Users */}
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    {/* Todos */}
                    <Route path="/" element={<TodosList />} />
                    <Route path="/create-todo" element={<CreateTodo />} />
                    <Route path="/edit/:id" element={<EditTodo />} />
                  </Routes>
                </main>
              </div>
            </TodosContextProvider>
          </UserContextProvider>
        </StaticContext.Provider>
      </Router>
    </>
  );
};

export default App;
