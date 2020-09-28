// eslint-disable-next-line
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { getScores } from '../../redux/actions/scores';
import checkAuth from "../../utils/checkAuth";

import TableScore from "./table";


function Reviews({ history }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  const { scores } = useSelector(({ scores }) => scores);
  // eslint-disable-next-line
  const [taskName, setTaskName] = React.useState(null);


  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/scores");
    dispatch(getScores(taskName))
    // eslint-disable-next-line
  }, [taskName]);

  return (
    <TableScore scores={scores} />
  );
}

export default Reviews;