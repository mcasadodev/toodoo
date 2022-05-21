import * as api from "../api";

// Action creators

export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(todo);
    dispatch({
      type: "CREATE",
      payload: data,
    });
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
