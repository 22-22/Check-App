const initialSatate = {
  activeTasks:null
};

const reviewRequest = (state = initialSatate, action) => {
  if (action.type === "GET_ACTIVE_TASKS") {
    return {
      ...state,
      activeTasks: action.payload,
    };
  }
  return state;
};

export default reviewRequest;