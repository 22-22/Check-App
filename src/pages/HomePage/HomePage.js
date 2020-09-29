import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const { infoUser } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="account">
      <h2 className="account__title">Welcome to our X-check app!</h2>
      <div className="account__content">
        <div className="account__content-name">
          Your account: <span>{infoUser.id}</span>
        </div>
        <div className="account__content-status">
          Your role: <span>{infoUser.role}</span>
        </div>
        <p></p>
        <p>Good luck!</p>
      </div>
    </div>
  );
}

export default HomePage;
