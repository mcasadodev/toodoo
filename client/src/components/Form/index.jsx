import React, { useState, useContext } from "react";
import FileBase from "react-file-base64";

import { createTodo } from "../../api";

//import StaticContext from "../../context/StaticContext";
import TodosContext from "../../context/TodosContext";

import styles from "./form.module.css";

const Form = () => {
  //const staticContext = useContext(StaticContext);
  const { setTodos } = useContext(TodosContext);

  const [todoData, setTodoData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(todoData, setTodos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const clearForm = () => {};

  return (
    <>
      <h1>FORM</h1>
      <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className={styles.cuki}>Create todo</h6>
        <label htmlFor="creator">Creator</label>
        <input
          id="creatorTextInput"
          type="text"
          name="creator"
          value={todoData.creator}
          onChange={handleChange}
        />
        <label htmlFor="creator">Title</label>
        <input
          id="titleTextInput"
          type="text"
          name="title"
          value={todoData.title}
          onChange={handleChange}
        />
        <label htmlFor="creator">Message</label>
        <input
          id="messageTextInput"
          type="text"
          name="message"
          value={todoData.message}
          onChange={handleChange}
        />
        <label htmlFor="creator">Tags</label>
        <input
          id="tagsTextInput"
          type="text"
          name="tags"
          value={todoData.tags}
          onChange={handleChange}
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setTodoData({ ...todoData, selectedFile: base64 })
            }
          />
        </div>
        <button>Submit</button>
        <button onClick={clearForm}>Clear</button>
      </form>
    </>
  );
};

export default Form;
