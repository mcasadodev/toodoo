const url = "http://localhost:5000/panels";

export const getPanels = async (setPanels) => {
  await fetch(`${url}/panels-list`, {
    headers: {
      //"x-access-token": localStorage.getItem("token"),
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setPanels(res);
    });
};

export const createPanel = async (panel, setPanels) => {
  await fetch(`${url}/create-panel`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(panel),
  }).then(() => {
    getPanels(setPanels);
  });
};
