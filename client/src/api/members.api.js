const url = "http://localhost:5000/members";

export const getMembers = async (setMembers) => {
  await fetch(url, {
    headers: {
      //"x-access-token": localStorage.getItem("token"),
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      // It means we have passed the middleware verifyJWT() and we reached getTodos()
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setMembers(res);
    });
};

export const addMember = async (member, setMembers) => {
  await fetch(`${url}/add`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(member),
  }).then(() => {
    getMembers(setMembers);
  });
};

export const deleteMember = async (member, setMembers) => {
  await fetch(`${url}/delete/${member.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    //body: JSON.stringify(member),
  }).then(() => {
    getMembers(setMembers);
  });
};
