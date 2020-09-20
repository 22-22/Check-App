import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckFormHeader } from './CheckFormHeader';
import { CheckFormCategory } from './CheckFormCategory';
import { countAllItems, countCheckedItems, countPoints } from '../../utils/checkForm'
import checkAuth from "../../utils/checkAuth";
import { fetchTaskInfo, addNewScore } from '../../services/ServerRequest';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import './_CheckForm.scss';

const title = 'Songbird';

// const revReqObj = {
//   "id": 123,
//   "crossCheckSessionId": null,
//   "author": 22 - 22,
//   "task": "Songbird",
//   "state": "DRAFT",
//   "demo": "demo",
//   "PR": "PR",
//   "selfGrade": {}
// }

// function CheckForm({ history, revReqObj, checkType }) {
function CheckForm({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const role = useSelector(state => state.statesAccount.infoUser.role);
  const user = useSelector(state => state.statesAccount.infoUser.id);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/check-form");
  }, []);
  
  console.log('review request id is', match.params.id);

  const [itemsNumber, setItemsNumber] = useState(0);
  const [task, setTask] = useState({});
  const [score, setScore] = useState({});

  useEffect(() => {
    // fetchTaskInfo(revReqObj.task).then(task => setTask(task))
    fetchTaskInfo(title).then(task => {
      const filteredItems = task.items.map(item => {
        const filtered = item.categoryItems.filter(item => 
          (role === 'mentor') ? item : !item.checkByMentorOnly)
        return {...item, categoryItems: filtered}
      });
      filteredItems.forEach(item => score[item.category] = []);
      setTask({ ...task, items: filteredItems });
      setItemsNumber(countAllItems(filteredItems));
    })
  }, [role])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (countCheckedItems(score) === itemsNumber) {
      const checkInfo = {
        user,
        score: countPoints(score),
        id: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        items: score,
      }

      addNewScore(checkInfo);
      console.log('inside', checkInfo)

      // const selfCheckInfo = { ...revReqObj, selfGrade: score, status: "PUBLISHED" }
      // checkType === "self" ? sendReviewRequest(totalScoreInfo) : addNewScore(checkInfo);
    }
  }

  return (
    <div className="account">
      <div className="checkform__wrapper">
        <CheckFormHeader
          title={task.title} items={task.items}
          score={score} itemsNumber={itemsNumber}
        />
        <main className="checkform__main">
          <p className="checkform__info">
            {task.description}
          </p>
          <form className="checkform__items">
            {task.items &&
              task.items.map((category, idx) => (
                <CheckFormCategory
                  role={role} key={idx} category={category}
                  score={score} setScore={setScore}
                />
              ))
            }
            <Button className="checkform__btn-submit"
              onClick={handleFormSubmit}
              // htmlType="submit"
              type="primary" size="large"
              icon={<SendOutlined />}
            >
              SEND
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default CheckForm;
