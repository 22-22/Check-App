import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/home");
  }, []);

  return (
    <div className="account">
        <h2 className="account__title">Welcome to our X-check app!</h2>
    </div>
  );
}

export default HomePage;
