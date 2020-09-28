import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { CheckFormHeader } from './CheckFormHeader';
import { CheckFormCategory } from './CheckFormCategory';
import {
  countAllItems, countCheckedItems,
  countPoints, getTime, getDate
} from '../../utils/checkForm'
import checkAuth from "../../utils/checkAuth";
import {
  fetchTaskInfo, addNewScore, fetchReviewRequestsById,
  sendReviewRequest, fetchAllScores, updateScore, updateReviewRequest
} from '../../services/ServerRequest';

import { Button, Tooltip, Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './_CheckForm.scss';

const customCategory = 'Extra special';

function CheckForm({ history, match, revReqObj, checkType }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const role = useSelector(state => state.statesAccount.infoUser.role);
  const user = useSelector(state => state.statesAccount.infoUser.id);
  // eslint-disable-next-line
  const draft = match && match.params && match.params.status || '';

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/check-form");
    // eslint-disable-next-line
  }, []);

  const [itemsNumber, setItemsNumber] = useState(0);
  const [task, setTask] = useState({});
  const [score, setScore] = useState({});
  const [selfCheck, setSelfCheck] = useState({});
  const [draftScore, setDraftScore] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (checkType === 'self') {
      setSelfCheck(revReqObj)
    } else if (match.params.id) {
      fetchReviewRequestsById(match.params.id)
        .then(data => {
          setSelfCheck(data[0])
          setScore(data[0].selfGradeDetails);
        })
    }
    else {
      setSelfCheck(null)
    }

    if (draft === 'checkDraft') {
      fetchAllScores()
        .then(allScores => {
          const currentScore = allScores
            .find(score => score.revReqId === match.params.id);
          setDraftScore(currentScore);
          setScore(currentScore.items);
        })
    }
    // eslint-disable-next-line
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
          const taskItems = checkType === 'self' ? task.items : filteredItems;
          if (checkType === 'self' || !draft) {
            taskItems.forEach(item => setScore(prevState => {
              return { ...prevState, [item.category]: [] }
            }));
          }
          setTask({ ...task, items: taskItems });
        }
      })
      // eslint-disable-next-line
  }, [selfCheck])

  useEffect(() => {
    setItemsNumber(countAllItems(task.items));
  }, [task])

  const handleFormSubmit = () => {
    if (countCheckedItems(score) === itemsNumber) {
      const date = getDate();
      const time = getTime();
      const { task, student } = selfCheck;
      const totalScore = countPoints(score);

      const selfCheckNew = {
        ...selfCheck,
        selfGrade: totalScore,
        status: 'published',
        selfGradeDetails: score,
        sendingDate: `${date} ${time}`,
      }

      const checkNew = {
        task,
        reviewer: user,
        student,
        score: totalScore,
        id: new Date().getTime(),
        sendingDate: `${date} ${time}`,
        items: score,
        status: 'published',
      }

      const checkWithDraft = {
        score: totalScore,
        sendingDate: `${date} ${time}`,
        items: score,
        status: 'published',
      }

      if (draft === 'selfCheckDraft') {
        updateReviewRequest(selfCheck.id, selfCheck, selfCheckNew);
        setSubmitted(true);
      } else if (draft === 'checkDraft') {
        updateScore(draftScore.id, draftScore, checkWithDraft);
        setSubmitted(true);
      } else if (checkType === 'self') {
        sendReviewRequest(selfCheckNew);
      } else {
        addNewScore(checkNew);
        setSubmitted(true);
      }
    }
  }

  const handleExtraCheckPoint = () => {
    if (!task.items.find(item => item.category === customCategory)) {
      setTask({
        ...task, items: [
          ...task.items, {
            category: customCategory,
            categoryItems: [{
              description: `Pick one thing you really like or dislike 
              about this work and add your positive or negative mark. 
              Max or min value is a total score divided by the number of all points to check`,
              minScore: Math.round(-task.score / itemsNumber),
              maxScore: Math.round(task.score / itemsNumber),
              checkByMentorOnly: false
            }]
          }
        ]
      });
      setScore((prevState) => {
        return { ...prevState, [customCategory]: [] }
      })
    } else {
      setTask((prevTask) => {
        const newTask = { ...prevTask };
        newTask.items.pop();
        return newTask;
      })
      setScore((prevScore) => {
        const newScore = { ...prevScore };
        delete newScore[customCategory];
        return newScore;
      })
    }
  }

  const handleDraft = () => {
    const date = getDate();
    const time = getTime();
    const { id, task, student } = selfCheck;
    const selfCheckNew = {
      ...selfCheck,
      status: 'selfCheckDraft',
      selfGradeDetails: score,
      sendingDate: `${date} ${time}`,
    }

    const checkNew = {
      status: 'checkDraft',
      revReqId: id,
      id: new Date().getTime(),
      task,
      reviewer: user,
      student,
      items: score,
      sendingDate: `${date} ${time}`
    }

    if (checkType === 'self' || draft === 'selfCheckDraft') {
      sendReviewRequest(selfCheckNew);
      setSubmitted(true);
    } else {
      addNewScore(checkNew);
      setSubmitted(true);
    }
  }

  if (submitted) {
    if (draft) {
      return <Redirect to="/drafts" />
    } else {
      return <Redirect to="/review-requests" />
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
                    checkType={checkType}
                    draft={draft}
                  />
                ))
              }
              <div className="checkform__btns">
                <Button className="checkform__btns-extra"
                  onClick={handleDraft}
                >
                  SAVE AS DRAFT
            </Button>
                <Button className="checkform__btns-submit"
                  type="primary" size="large"
                  icon={<SendOutlined />}
                  htmlType="submit"
                >
                  SEND
            </Button>
                <Tooltip title="You can add one extra positive or negative mark.">
                  <Button className="checkform__btns-extra"
                    onClick={handleExtraCheckPoint}>
                    {task.items &&
                      task.items.find(item => item.category === customCategory) ?
                      'DELETE EXTRA CHECKPOINT' : 'ADD EXTRA CHECKPOINT'
                    }
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
