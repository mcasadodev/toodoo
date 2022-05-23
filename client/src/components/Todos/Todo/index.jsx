import React from "react";
import moment from "moment";

const Todo = ({ todo }) => {
  return (
    <div>
      <h3>Title: {todo.title}</h3>
      <p>Creator: {todo.creator}</p>
      <p>Message: {todo.message}</p>
      <p>Tags: {todo.tags}</p>
      <p>Likes: {todo.likeCount}</p>
      <p>Created: {moment(todo.publicationDate).fromNow()}</p>
      <img src={todo.selectedFile} alt="" />
    </div>
  );
};

export default Todo;
