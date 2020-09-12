import { fetchSortAndFilterTasks } from '../../services/ServerRequest';

export const setTasks = (array) => ({
  type: "GET_TASKS",
  payload: array,
});


export const getTasks = (status, sortBy, sortAs) => (dispatch) => {
  fetchSortAndFilterTasks(status, sortBy, sortAs)
      .then(data=>dispatch(setTasks(data)));
};
