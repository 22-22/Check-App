
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { getScores } from '../../redux/actions/scores';
import checkAuth from "../../utils/checkAuth";

import ScoreReview from '../../components/ScoreReview/ScoreReview';
import TableScore from "./table";


function Reviews({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  const { scores } = useSelector(({ scores }) => scores);

  const [taskName, setTaskName] = React.useState(null);


  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/scores");
    dispatch(getScores(taskName))
    
  }, [taskName]);

  return (
    <TableScore scores={scores}/>
  );
}

export default Reviews;