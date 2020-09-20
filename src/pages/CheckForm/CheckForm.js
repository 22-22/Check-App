import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function CheckForm({ history, match }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/check-form");
  }, []);
  
  console.log('review request id is', match.params.id);

  return (
    <div className="account">
      <div className="account__header">
        <h2 className="account__title">CheckForm</h2>
        <p>Юля сама все сделает</p>
      </div>
    </div>
  );
}
export default CheckForm;
