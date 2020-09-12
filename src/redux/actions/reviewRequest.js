import { fetchTasks } from '../../services/ServerRequest';

export const setActiveTasks = (array) => ({
  type: "GET_ACTIVE_TASKS",
  payload: array,
});


export const getActiveTasks = (status) => (dispatch) => {
   fetchTasks(status)
      .then(data=>dispatch(setActiveTasks(data)));
};