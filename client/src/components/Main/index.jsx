import React, { useEffect, useContext, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useUser } from "hooks/useUser";
import TodosContext from "context/TodosContext";

import Aside from "components/Aside";
import TodosList from "components/TodosList";
import SignIn from "components/Forms/Users/SignIn";
import SignUp from "components/Forms/Users/SignUp";
//import LogOut from "components/Forms/Users/LogOut";
import CreateTodo from "components/Forms/Todos/CreateTodo";
import EditTodo from "components/Forms/Todos/EditTodo";

import PanelsList from "components/PanelsList";
import CreatePanel from "components/Forms/Panels/CreatePanel";

import AddMembers from "components/AddMembers";

import PrivateRoute from "components/PrivateRoute";

import styles from "./main.module.css";

const Main = () => {
  const { isLogged } = useUser();

  const refAside = useRef(null);
  const refSection = useRef(null);

  //const navigate = useNavigate();

  const { isPanelSelected } = useContext(TodosContext);

  useEffect(() => {
    if (isLogged) {
      if (isPanelSelected) {
        refAside.current.classList.remove(`display-none`);
        refSection.current.classList.add(`${styles.margin_left300}`);
      } else {
        refAside.current.classList.add(`display-none`);
        refSection.current.classList.remove(`${styles.margin_left300}`);
      }
    } else {
      refAside.current.classList.add(`display-none`);
      refSection.current.classList.remove(`${styles.margin_left300}`);
    }
  });

  return (
    <main id="container">
      <div ref={refAside} className={`${styles.aside}`}>
        <Aside />
      </div>
      <section ref={refSection} className={`${styles.section}`}>
        <Routes>
          <Route
            exact
            path="/"
            element={isLogged ? <Navigate to="/panels-list" /> : null}
          />
          {/* Users */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Panels */}
          <Route
            path="/panels-list"
            element={
              <PrivateRoute>
                <PanelsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-panel"
            element={
              <PrivateRoute>
                <CreatePanel />
              </PrivateRoute>
            }
          />

          {/* Members */}
          <Route
            path={`/panel-:id/members-list`}
            element={
              <PrivateRoute>
                <AddMembers />
              </PrivateRoute>
            }
          />

          {/* Todos */}
          <Route
            path={`/panel-:id/tasks-list`}
            element={
              <PrivateRoute>
                <TodosList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-todo"
            element={
              <PrivateRoute>
                <CreateTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditTodo />
              </PrivateRoute>
            }
          />
        </Routes>
      </section>
    </main>
  );
};

export default Main;
