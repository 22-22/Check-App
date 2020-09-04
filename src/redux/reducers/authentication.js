const initialSatate = {
  loading: true,
  authentication: false,
  githubId:'',
  role:''
};

const authentication = (state = initialSatate, action) => {
  if (action.type === "SET_AUTHENTICATION") {
    return {
      ...state,
      loading: false,
      authentication: true,
      githubId: action.payload[0]['id'],
      role:action.payload[0]['role'],
    };
  }
  return state;
};

export default authentication;