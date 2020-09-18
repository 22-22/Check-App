import { fetchScores } from '../../services/ServerRequest';

export const setScores = (array) => ({
  type: "GET_SCORES",
  payload: array,
});

export const getScores = (task) => (dispatch) => {
   fetchScores(task)
      .then(data=>dispatch(setScores(data)));
};
