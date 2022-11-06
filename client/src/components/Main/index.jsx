import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import { useUser } from "hooks/useUser";

import Aside from "components/Aside";
import TodosList from "components/TodosList";
import SignIn from "components/Forms/Users/SignIn";
import SignUp from "components/Forms/Users/SignUp";
//import LogOut from "components/Forms/Users/LogOut";
import CreateTodo from "components/Forms/Todos/CreateTodo";
import EditTodo from "components/Forms/Todos/EditTodo";

import PanelsList from "components/PanelsList";
import CreatePanel from "components/Forms/Panels/CreatePanel";

import styles from "./main.module.css";

const Main = () => {
  const { isLogged } = useUser();

  const refSection = useRef(null);

  useEffect(() => {
    if (isLogged) refSection.current.classList.add(`${styles.margin_left300}`);
    else refSection.current.classList.remove(`${styles.margin_left300}`);
  });

  return (
    <main id="container">
      {isLogged ? (
        <div className={`${styles.aside}`}>
          <Aside />
        </div>
      ) : null}
      <section
        ref={refSection}
        className={`${styles.section} ${styles.margin_left300}`}
      >
        <Routes>
          <Route path="/" element={null} />
          {/* Users */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {isLogged ? (
            <>
              {/* Panels */}
              <Route path="/panels-list" element={<PanelsList />} />
              <Route path="/create-panel" element={<CreatePanel />} />
              {/* Todos */}
              <Route path="/tasks-list" element={<TodosList />} />
              <Route path="/create-todo" element={<CreateTodo />} />
              <Route path="/edit/:id" element={<EditTodo />} />
            </>
          ) : null}
        </Routes>
      </section>
    </main>
  );
};

export default Main;
