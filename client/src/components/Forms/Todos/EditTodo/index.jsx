import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import FileBase from "react-file-base64";

import { editTodo } from "../../../../api/todos.api";

//import StaticContext from "../../context/StaticContext";
import TodosContext from "../../../../context/TodosContext";

import styles from "../../form.module.css";

const EditTodo = () => {
  //const staticContext = useContext(StaticContext);
  const { setTodos } = useContext(TodosContext);
  const { currentTodo } = useContext(TodosContext);

  const params = useParams();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: currentTodo.title,
    creator: currentTodo.creator,
    message: currentTodo.message,
    tags: currentTodo.tags,
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todoData, params.id, setTodos);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  return (
    <>
      <form action="" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className={styles.form_title}>Edit Todo</h6>
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
          <button className={styles.blue_button}>Edit Todo</button>
        </div>
      </form>
    </>
  );
};

export default EditTodo;
