import { fetchAllTasks } from '../../services/ServerRequest';

export const setTasks = (array) => ({
  type: "GET_TASKS",
  payload: array,
});


export const getTasks = () => (dispatch) => {
  fetchAllTasks()
      .then(data=>dispatch(setTasks(data)));
};
