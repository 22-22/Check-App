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
      <div className="account__header">
        <h2 className="account__title">RSS React Q3(active)</h2>
        <p>ХЗ что тут надо</p>
      </div>
    </div>
  );
}

export default HomePage;
