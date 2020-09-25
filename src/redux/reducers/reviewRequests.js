const initialState = {
  reviewRequests:null
};

const reviewRequests = (state = initialState, action) => {
  if (action.type === "GET_REVIEW_REQUESTS") {
    return {
      ...state,
      reviewRequests: action.payload,
    };
  }
  return state;
};

export default reviewRequests;