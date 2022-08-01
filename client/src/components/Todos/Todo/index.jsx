import React from "react";
import moment from "moment";

import styles from "./todo.module.css";

const Todo = ({ todo }) => {
  return (
    <div className={styles.todoCard}>
      <h3>Title: {todo.title}</h3>
      <p>Creator: {todo.creator}</p>
      <p>Message: {todo.message}</p>
      <p>Tags: {todo.tags}</p>
      <p>Likes: {todo.likeCount}</p>
      <p>Created: {moment(todo.publicationDate).fromNow()}</p>
      {todo.selectedFile === "" ? <img src={todo.selectedFile} alt="" /> : null}
    </div>
  );
};

export default Todo;
