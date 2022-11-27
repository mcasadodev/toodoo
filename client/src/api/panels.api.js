const url = `${
  process.env.NODE_ENV === "PRO"
    ? "https://toodoo.herokuapp.com"
    : "http://localhost:5000"
}/panels`;

const headers =
  process.env.NODE_ENV === "PRO"
    ? {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      }
    : {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      };

export const getPanels = async (setPanels) => {
  await fetch(`${url}/panels-list`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      console.log("defef");
      setPanels(res);
    });
};

export const getPanel = async (panelId, setCurrentPanel) => {
  if (!localStorage.getItem("current-panel")) return;
  await fetch(`${url}/panel-${panelId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res._id) res.id = res._id;
      localStorage.setItem("current-panel", res.id);
      if (setCurrentPanel) setCurrentPanel(res);
    });
};

export const createPanel = async (panel, setPanels) => {
  await fetch(`${url}/create-panel`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: headers,
    body: JSON.stringify(panel),
  }).then(() => {
    getPanels(setPanels);
  });
};

export const deletePanel = async (panel, setPanels) => {
  await fetch(`${url}/delete/${panel.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: headers,
    body: JSON.stringify(panel),
  }).then(() => {
    getPanels(1, setPanels);
  });
};
