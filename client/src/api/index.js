const url = "http://localhost:5000/todos";

export const fetchTodos = async (setTodos) => {
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const response = res.map((item) => item);
      setTodos(response);
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
    fetchTodos(setTodos);
    console.log(`Created new todo: ${todo.publicationDate}`);
  });
};
