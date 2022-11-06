const url = "http://localhost:5000/todos";

export const getTodos = async (panelId, setTodos) => {
  await fetch(`${url}/${panelId}/tasks-list`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setTodos(res);
    });
};

export const createTodo = async (todo, setTodos) => {
  await fetch(`${url}/create-todo`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      //"x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(1, setTodos);
    //console.log(`Created new todo: ${todo.publicationDate}`);
  });
};

export const editTodo = async (todo, id, setTodos) => {
  await fetch(`${url}/edit/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      //"x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((res) => {
      getTodos(1, setTodos);
      return res;
    });
};

export const deleteTodo = async (todo, setTodos) => {
  await fetch(`${url}/delete/${todo.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      //"x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(1, setTodos);
  });
};
