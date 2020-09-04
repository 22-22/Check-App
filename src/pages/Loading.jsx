import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, fetchUser } from "../redux/actions/authentication";

import checkAuth from '../utils/checkAuth';
function Loading({ history }) {
  // const dispatch = useDispatch();
  // const { authentication } = useSelector(({ authentication }) => authentication);
  // React.useEffect(() => {
  //   checkAuth(history, authentication, dispatch, "/account" )
  // }, [authentication]);

  return (
    <div className="container">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5"></div>
    </div>
  );
}
// localStorage.setItem("gitHubUser",'')
export default Loading;