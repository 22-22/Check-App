import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTasks } from '../../redux/actions/reviewRequest';
import checkAuth from "../../utils/checkAuth";

function ReviewRequest({ history, match }) {
  const [status, setStatus] = React.useState('published');
  const dispatch = useDispatch();

  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  const { activeTasks } = useSelector(({ reviewRequest }) => reviewRequest);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/review-request");
    dispatch(getActiveTasks(status));
  }, [status]);
  
  console.log('task id is', match.params.id);

  return (
    <div className="create-task">
        <h2 className="create-task__title">ReviewRequest</h2>
        <p>Страница получает базовый объект авторизированного пользователя(infoUser), Список активных заданий со всеми описаниями. Если нужно будте отсортировать по другому статусу-(исп. setStatus)</p>
        {activeTasks && <h1> АКТИВНЫЕ ЗАДАЧИ {activeTasks.length}</h1>}
    </div>
  );
}

export default ReviewRequest;
