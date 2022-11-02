import { Routes, Route } from "react-router-dom";

import { useUser } from "hooks/useUser";

import Aside from "components/Aside";
import TodosList from "components/TodosList";
import SignIn from "components/Forms/Users/SignIn";
import SignUp from "components/Forms/Users/SignUp";
//import LogOut from "components/Forms/Users/LogOut";
import CreateTodo from "components/Forms/Todos/CreateTodo";
import EditTodo from "components/Forms/Todos/EditTodo";

import styles from "./main.module.css";

const Main = () => {
  const { isLogged } = useUser();

  return (
    <main id="container">
      {isLogged ? (
        <div className={`${styles.aside}`}>
          <Aside />
        </div>
      ) : null}
      <section className={`${styles.section}`}>
        <Routes>
          {/* Users */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Todos */}
          <Route path="/" element={<TodosList />} />
          <Route path="/create-todo" element={<CreateTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </section>
    </main>
  );
};

export default Main;
