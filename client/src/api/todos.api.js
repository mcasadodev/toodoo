const url = "http://localhost:5000/todos";

export const getTodos = async (setTodos) => {
  await fetch(url, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.user === undefined) {
        // It means we have passed the middleware verifyJWT() and we reached getTodos()
        res.forEach((item) => {
          if (item._id) item.id = item._id;
        });
      }
      setTodos(res);
    });
};

export const createTodo = async (todo, setTodos, user) => {
  await fetch(`${url}/create-todo`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(setTodos, user);
    //console.log(`Created new todo: ${todo.publicationDate}`);
  });
};

export const editTodo = async (todo, id, setTodos, user) => {
  await fetch(`${url}/edit/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((res) => {
      getTodos(setTodos, user);
      return res;
    });
};

export const deleteTodo = async (todo, setTodos, user) => {
  await fetch(`${url}/delete/${todo.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(setTodos, user);
  });
};
