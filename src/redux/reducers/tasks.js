const initialSatate = {
  tasks:null
};

const tasks = (state = initialSatate, action) => {
  if (action.type === "GET_TASKS") {
    return {
      ...state,
      tasks: action.payload,
    };
  }
  return state;
};

export default tasks;