import React from "react";
import { useDispatch, useSelector } from "react-redux";

import checkAuth from "../../utils/checkAuth";

function CreateTask({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  
  
  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/create-task");
  }, []);

  return (
    <div className="create-task">
        <h2 className="create-task__title">CREATE TASK</h2>
        <p>{infoUser.id}</p>
        <p>страница получает объект залогиненого пользователя</p>
    </div>
  );
}

export default CreateTask;