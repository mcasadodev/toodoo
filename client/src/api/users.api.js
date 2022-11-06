const url = "http://localhost:5000";

export const signIn = async (user, setJWT) => {
  await fetch(`${url}/sign-in`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.auth) {
        //localStorage.setItem("token", res.token);
        setJWT(res.token);
      } else {
        console.log("User not authenticated");
        setJWT(null);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const signUp = async (user, setMessages) => {
  await fetch(`${url}/sign-up`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      setMessages(res);
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
