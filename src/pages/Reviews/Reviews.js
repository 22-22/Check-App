import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function Reviews({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/reviews");
  }, []);


  return (
    <div className="account">
      <p>Puxless Puxless это кто ??? тут ничего нет и хз что тут должно быть</p>
    </div>
  );
}

export default Reviews;