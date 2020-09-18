import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from '../../redux/actions/scores';
import checkAuth from "../../utils/checkAuth";

import ScoreReview from '../../components/ScoreReview/ScoreReview';

function Scores({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
  const { scores } = useSelector(({ scores }) => scores);
  
  const [taskName, setTaskName] = React.useState(null);


  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/scores");
    dispatch(getScores(taskName))
    console.log(scores)
  }, [taskName]);

  return (
    
    <div className="create-task">
        <h2 className="create-task__title">Scores</h2>
        {scores && scores.map((item, index)=> <ScoreReview key={index} description= {item.description}/>)}
        <p>Страница получает базовый объект авторизированного пользователя(infoUser), Список всех scores со всеми описаниями. Пример фильтрации по названиям task реализован на кнопках
          так же импортирован Настин сомпонент ScoreReview, и в его передается описание score.
        </p>
        <button onClick={()=> setTaskName(null)}> Все задачи </button> 
        <button onClick={()=> setTaskName('songbird')}> фильтрануть по songbird</button>   
        <button onClick={()=> setTaskName('songbird1')}> фильтрануть по songbird1</button>  

    </div>
  );
}

export default Scores;