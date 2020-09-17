import { fetchReviewRequests } from '../../services/ServerRequest';

export const setReviewRequests = (array) => ({
  type: "GET_REVIEW_REQUESTS",
  payload: array,
});


export const getReviewRequests = () => (dispatch) => {
  fetchReviewRequests()
      .then(data=>dispatch(setReviewRequests(data)));
};
