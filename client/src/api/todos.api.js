const url = "https://sleepy-sands-80416.herokuapp.com/todos";

export const getTodos = async (
  panelId,
  setTodos,
  currentPanel,
  setCurrentPanel
) => {
  await fetch(`${url}/${panelId}/tasks-list`, {
    //headers: {
    //"x-access-token": localStorage.getItem("token"),
    //},
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      if (setCurrentPanel) setCurrentPanel(currentPanel);
      setTodos(res);
    });
};

export const getTodo = async (todoId, setTodoData) => {
  await fetch(`${url}/task-${todoId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res._id) res.id = res._id;
      setTodoData(res);
    });
};

export const createTodo = async (todo, panelId, setTodos) => {
  await fetch(`${url}/create-todo`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      //"x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...todo, panelId }),
  }).then(() => {
    getTodos(panelId, setTodos);
    //console.log(`Created new todo: ${todo.publicationDate}`);
  });
};

export const editTodo = async (todo, id, panelId, setTodos) => {
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
      getTodos(panelId, setTodos);
      return res;
    });
};

export const deleteTodo = async (todo, panelId, setTodos) => {
  await fetch(`${url}/delete/${todo.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(() => {
    getTodos(panelId, setTodos);
  });
};
