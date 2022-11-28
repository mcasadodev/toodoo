const url = "https://toodoo.herokuapp.com/users";

const headers = {
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

export const signIn = async (user, setJWT, setUserName) => {
  await fetch(`${url}/sign-in`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: headers,
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.auth) {
        //localStorage.setItem("token", res.token);
        setJWT(res.token);
        setUserName(res.result.name);
      } else {
        console.log("User not authenticated");
        setJWT(null);
        setUserName("");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const signUp = async (user, setMessages, setErrors, navigate) => {
  await fetch(`${url}/sign-up`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: headers,
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.messages) {
        setMessages(res.messages);
        setErrors([]);
        navigate("/");
      }
      if (res.errors) {
        setErrors(res.errors);
        setMessages([]);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const logout = async () => {
  await fetch(`${url}/log-out`, {
    method: "get",
    credentials: "include", // <--- YOU NEED THIS LINE
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export const checkIsLogged = async (setJTW, navigate) => {
  await fetch(`${url}/check-if-logged`, {
    method: "get",
    credentials: "include", // <--- YOU NEED THIS LINE,
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status !== "LOGGED!") {
        console.log(res.status);
        //navigate("/");
        setJTW(null);
      } else {
        console.log(res.status);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getUsers = async (setUsers) => {
  await fetch(`${url}/users-list`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setUsers(res);
    });
};
