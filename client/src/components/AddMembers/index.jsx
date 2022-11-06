import React, { useContext } from "react";

import TodosContext from "context/TodosContext";

import styles from "../../addMembers.module.css";

const AddMembers = () => {
  const { members, setMembers } = useContext(TodosContext);

  return (
    <>
      <h6 className={styles.form_title}>Add Members to this panel</h6>
      <div className={styles.container}>
        <ul>
          {members.map((member) => (
            <li>{member.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddMembers;
