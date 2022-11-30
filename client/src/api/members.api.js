const url = `http://localhost:5000/members`;

export const getMembers = async (setMembers) => {
  await fetch(`${url}/members-list`, {
    headers: {
      "current-panel": localStorage.getItem("current-panel"),
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setMembers(res);
    });
};

export const addMember = async (member, setMembers) => {
  await fetch(`${url}/add-member`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "current-panel": localStorage.getItem("current-panel"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId: member }),
  }).then(() => {
    getMembers(setMembers);
  });
};

export const deleteMember = async (member, setMembers) => {
  await fetch(`${url}/delete/${member.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "current-panel": localStorage.getItem("current-panel"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId: member }),
  }).then(() => {
    getMembers(setMembers);
  });
};
