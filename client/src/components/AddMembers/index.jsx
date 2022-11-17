import React, { useEffect, useContext, useRef } from "react";

import { getMembers, addMember } from "api/members.api";

import { useUser } from "hooks/useUser";
import TodosContext from "context/TodosContext";

import styles from "./addMembers.module.css";
import { getUsers } from "api/users.api";

const AddMembers = () => {
  const { members, setMembers } = useContext(TodosContext);

  const refSelect = useRef(null);
  const { users, setUsers } = useUser();

  useEffect(() => {
    getUsers(setUsers);
    getMembers(setMembers);
  }, [setUsers, setMembers]);

  useEffect(() => {
    removeAllChildNodes(refSelect.current);
    users.forEach((member) => {
      let newOption = document.createElement("option");
      newOption.value = member.id;
      newOption.text = member.name;
      refSelect.current.appendChild(newOption);
    });
  });

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  const handleClick = () => {
    addMember(refSelect.current.value);
    getMembers(setMembers);
  };

  return (
    <>
      <h6 className={styles.title}>List of the members of this panel</h6>
      <ul>
        {members.map((member) => (
          <li>{member.name}</li>
        ))}
      </ul>
      <h6 className={styles.title}>Add members to this panel</h6>
      <select id="slctMembers" ref={refSelect}>
        <option value="Choose One">Choose one</option>
      </select>
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default AddMembers;
