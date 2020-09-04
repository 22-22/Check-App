import { fetchUser } from "../redux/actions/authentication";

function checkAuth( history , authentication, dispatch, linkPage) {

  const transitionAuth = (link) => {
    history.push(link);
  };
  if (localStorage.getItem("gitHubUser")) {
    authentication && transitionAuth(linkPage);
    dispatch(fetchUser(localStorage.getItem("gitHubUser")));
  } else {
    transitionAuth("/authentication");
  }
}
export default checkAuth;