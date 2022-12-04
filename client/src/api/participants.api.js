import { baseUrl } from "api/config.api";

const url = `${baseUrl}/participants`;

export const getParticipants = async (setParticipants) => {
  await fetch(url, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        if (item._id) item.id = item._id;
      });
      setParticipants(res);
    });
};

export const addParticipant = async (participant, setParticipants) => {
  await fetch(`${url}/add`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  }).then(() => {
    getParticipants(setParticipants);
  });
};

export const deleteParticipant = async (participant, setParticipants) => {
  await fetch(`${url}/delete/${participant.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    getParticipants(setParticipants);
  });
};
