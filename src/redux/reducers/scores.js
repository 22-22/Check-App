const initialSatate = {
  scores:null
};

const scores = (state = initialSatate, action) => {
  if (action.type === "GET_SCORES") {
    return {
      ...state,
      scores: action.payload,
    };
  }
  return state;
};

export default scores;