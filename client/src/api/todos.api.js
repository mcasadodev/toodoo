const url = "http://localhost:5000/todos";

export const getTodos = async (setTodos) => {
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        const _id = item._id;
        if (_id) item.id = item._id;
      });

      console.log(res);
      setTodos(res);
    });
};

export const createTodo = async (todo, setTodos) => {
  await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(setTodos);
    //console.log(`Created new todo: ${todo.publicationDate}`);
  });
};

export const editTodo = async (todo, id, setTodos) => {
  await fetch(`${url}/edit/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(setTodos);
    //console.log(`Created new todo: ${todo.publicationDate}`);
  });
};

export const deleteTodo = async (todo, setTodos) => {
  await fetch(`${url}/delete/${todo.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(setTodos);
  });
};
