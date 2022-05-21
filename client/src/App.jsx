import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTodos } from "./actions/todos";
import Todos from "./components/Todos";
import Form from "./components/Form";

import logo from "./img/logo.png";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <header>
        <h1>App</h1>
        <img src={logo} alt="logo" />
      </header>
      <main>
        <div id="container">
          <Todos />
          <Form />
        </div>
      </main>
    </>
  );
};

export default App;
