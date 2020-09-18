const initialSatate = {
  authentication: false,
  infoUser:{}
};

const statesAccount = (state = initialSatate, action) => {
  if (action.type === "SET_AUTHENTICATION") {
    return {
      ...state,
      authentication: true,
      infoUser: action.payload,
    };
  }
  return state;
};

export default statesAccount;