import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import FileBase from "react-file-base64";

import { createTodo } from "api/todos.api";
import { useUser } from "hooks/useUser";

import TodosContext from "context/TodosContext";

import styles from "../../form.module.css";
import { useEffect } from "react";
import { getTodos } from "api/todos.api";

const CreateTodo = () => {
  const { setTodos } = useContext(TodosContext);
  const { isLogged } = useUser();

  const { user } = useUser();

  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: "",
    creator: "",
    message: "",
    tags: "",
    selectedFile: "",
    //user: localStorage.getItem("token"),
    user: user,
  });

  useEffect(() => {
    getTodos(setTodos);
  }, [setTodos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(todoData, setTodos, user);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  //const clearForm = () => {};

  return (
    <>
      <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className={styles.form_title}>Create Todo</h6>
        <div className={styles.container}>
          <input
            className={styles.inputField}
            id="titleInput"
            type="text"
            name="title"
            value={todoData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            className={styles.inputField}
            id="creatorInput"
            type="text"
            name="creator"
            value={todoData.creator}
            onChange={handleChange}
            placeholder="Creator"
          />
          <input
            className={styles.inputField}
            id="messageInput"
            type="text"
            name="message"
            value={todoData.message}
            onChange={handleChange}
            placeholder="Message"
          />
          <input
            className={styles.inputField}
            id="tagsInput"
            type="text"
            name="tags"
            value={todoData.tags}
            onChange={handleChange}
            placeholder="Tags"
          />
          {/*
          <div className={styles.inputField}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setTodoData({ ...todoData, selectedFile: base64 })
              }
            />
          </div>
          */}
          <button className={styles.blue_button}>Create Todo</button>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
