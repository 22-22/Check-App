import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/actions/tasks";
import checkAuth from "../../utils/checkAuth";

function Tasks({ history }) {
  const [status, setStatus] = React.useState(null);

  const [sortBy, setSortBy] = React.useState(null);

  const [sortAs, setSortAs] = React.useState(null);

  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(
    ({ statesAccount }) => statesAccount
  );
  const { tasks } = useSelector(({ tasks }) => tasks);

  const handleSort = (sortBy, sortAs) => {
    setSortBy(sortBy);
    setSortAs(sortAs);
  };
  const handleStatus = (status) => {
    setSortBy(null);
    setSortAs(null);
    setStatus(status);
  };

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/tasks");
    dispatch(getTasks(status, sortBy, sortAs));
    console.log(status, sortBy, sortAs);
  }, [status, sortBy, sortAs]);

  return (
    <div className="account">
      <div className="account__header">
        {tasks && console.log(tasks)}
        <h2 className="account__title">Tasks</h2>
        <p>
          Страница получает базовый объект авторизированного
          пользователя(infoUser), Список всех заданий со всеми описаниями.
          Пример фильтрации реализован ан кнопках
        </p>
        Надеюсь все будет понятно asc и desc это сортировка по возрастанию и
        убыванию
        <button onClick={() => handleSort("date", "asc")}>
          {" "}
          сортируем по дате
        </button>
        <button onClick={() => handleSort("maxScore", "desc")}>
          {" "}
          сортируем по MaxScore
        </button>
        <button onClick={() => handleStatus("archived")}>
          Архивные задания
        </button>
        <button onClick={() => handleStatus(null)}>Все задания</button>
        <button onClick={() => handleStatus("archived")}>
          Еще какая-то сортировка
        </button>
      </div>
    </div>
  );
}

export default Tasks;
