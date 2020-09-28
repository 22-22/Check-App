import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const { infoUser } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/home");
  }, []);

  return (
    <div className="account">
      <h2 className="account__title">Welcome to our X-check app!</h2>
      <div className="account__content">
        <div className="account__content-name">
          Account: <span>{infoUser.id}</span>
        </div>
        <div className="account__content-status">
          Status: <span>{infoUser.role}</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
