import React from "react";

import styles from "./notification.module.css";

const Notification = ({ type, text }) => {
  return (
    <div className={type === "message" ? styles.message : styles.error}>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
