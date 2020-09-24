import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckFormHeader } from './CheckFormHeader';
import { CheckFormCategory } from './CheckFormCategory';
import { countAllItems, countCheckedItems, countPoints } from '../../utils/checkForm'
import checkAuth from "../../utils/checkAuth";
import {
  fetchTaskInfo, addNewScore,
  fetchReviewRequestsById, sendReviewRequest
} from '../../services/ServerRequest';

import { Button, Tooltip, Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './_CheckForm.scss';

const customCategory = 'Cross-checker extra';

function CheckForm({ history, match, revReqObj, checkType }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const role = useSelector(state => state.statesAccount.infoUser.role);
  const user = useSelector(state => state.statesAccount.infoUser.id);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/check-form");
  }, []);

  const [itemsNumber, setItemsNumber] = useState(0);
  const [task, setTask] = useState({});
  const [score, setScore] = useState({});
  const [selfCheck, setSelfCheck] = useState({});

  useEffect(() => {
    if (checkType === 'self') {
      setSelfCheck(revReqObj)
    } else if (match.params.id) {
      fetchReviewRequestsById(match.params.id)
        .then(data => setSelfCheck(data[0]))
    } else {
      setSelfCheck(null)
    }
  }, [])

  useEffect(() => {
    selfCheck &&
      fetchTaskInfo(selfCheck.task).then(task => {
        if (task) {
          const filteredItems = task.items.map(item => {
            const filtered = item.categoryItems.filter(item =>
              (role === 'mentor') ? item : !item.checkByMentorOnly)
            return { ...item, categoryItems: filtered }
          });
          filteredItems.forEach(item => setScore(prevState => {
            return { ...prevState, [item.category]: [] }
          }));
          setTask({ ...task, items: filteredItems });
        }
      })
  }, [selfCheck])

  useEffect(() => {
    setItemsNumber(countAllItems(task.items));
  }, [task])

  const handleFormSubmit = (event) => {
    // event.preventDefault();
    if (countCheckedItems(score) === itemsNumber) {
      const date = new Date().toLocaleDateString()
        .split('.').reverse().join('-');
      const time = new Date().toLocaleTimeString();
      const { task, student } = selfCheck;
      const totalScore = countPoints(score);

      const selfCheckInfo = {
        ...selfCheck,
        selfGrade: totalScore,
        state: "published",
        selfGradeDetails: score,
        sendingDate: `${date} ${time}`,
      }

      const checkInfo = {
        task,
        user,
        student,
        score: totalScore,
        id: new Date().getTime(),
        sendingDate: `${date} ${time}`,
        items: score,
      }

      checkType === "self"
        ? sendReviewRequest(selfCheckInfo)
        : addNewScore(checkInfo);
    }
  }

  const addExtraCheckPoint = () => {
    if (!task.items.find(item => item.category === customCategory)) {
      setTask({
        ...task, items: [
          ...task.items, {
            category: customCategory,
            categoryItems: [{
              description: 'Pick one thing you really like or dislike about this work and add your positive or negative mark. Max or min value is a total score divided by the number of all points to check',
              minScore: Math.round(-task.maxScore / (itemsNumber + 1)),
              maxScore: Math.round(task.maxScore / (itemsNumber + 1)),
              checkByMentorOnly: false
            }]
          }
        ]
      });
      setScore(prevState => {
        return { ...prevState, [customCategory]: [] }
      })
    }
  }

  return (
    <div className="account">
      {selfCheck === null
        ? <div className="checkform__notification">
          <p>Sorry, you cannot open this form directly.</p>
          <p>BACK TO <Link to='/home'>HOME PAGE</Link></p>
        </div>
        : <div className="checkform__wrapper">
          <CheckFormHeader
            title={task.title} items={task.items}
            score={score} itemsNumber={itemsNumber}
          />
          <main className="checkform__main">
            <p className="checkform__info">
              {task.description}
            </p>
            <Form className="checkform__items"
              onFinish={handleFormSubmit}>
              {task.items &&
                task.items.map((category, idx) => (
                  <CheckFormCategory
                    role={role} key={idx} category={category}
                    customCategory={customCategory} score={score}
                    setScore={setScore} selfCheck={selfCheck}
                  />
                ))
              }
              <div className="checkform__btns">
                <Button className="checkform__btns-submit"
                  type="primary" size="large"
                  icon={<SendOutlined />}
                  htmlType="submit"
                >
                  SEND
            </Button>
                <Tooltip title="Add one extra positive or negative mark.">
                  <Button className="checkform__btns-extra"
                    onClick={addExtraCheckPoint}>
                    ADD EXTRA CHECKPOINT
            </Button>
                </Tooltip>
              </div>
            </Form>
          </main>
          <p className="checkform__comment">
            * Comment is required when your mark differs from the self-check.
            </p>
        </div>
      }
    </div>
  );
}
export default CheckForm;
