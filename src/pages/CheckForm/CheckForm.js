// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CheckFormHeader } from './CheckFormHeader';
// import { CheckFormCategory } from './CheckFormCategory';
// import { countAllItems, countCheckedItems, countPoints } from '../../utils/checkForm'
// import checkAuth from "../../utils/checkAuth";
// import {
//   fetchTaskInfo, addNewScore,
//   fetchReviewRequestsById, sendReviewRequest
// } from '../../services/ServerRequest';
// import { Button } from 'antd';
// import { SendOutlined } from '@ant-design/icons';
//
// import './_CheckForm.scss';
//
// function CheckForm({ history, match, revReqObj, checkType }) {
//   const dispatch = useDispatch();
//   const { authentication } = useSelector(({ statesAccount }) => statesAccount);
//   const role = useSelector(state => state.statesAccount.infoUser.role);
//   const user = useSelector(state => state.statesAccount.infoUser.id);
//
//   React.useEffect(() => {
//     !authentication && checkAuth(history, authentication, dispatch, "/check-form");
//   }, []);
//
//   const [itemsNumber, setItemsNumber] = useState(0);
//   const [task, setTask] = useState({});
//   const [score, setScore] = useState({});
//   const [selfCheck, setSelfCheck] = useState({});
//
//   useEffect(() => {
//     if (checkType === 'self') {
//       setSelfCheck(revReqObj)
//     } else {
//       fetchReviewRequestsById(match.params.id)
//         .then(data => setSelfCheck(data[0]))
//     }
//   }, [])
//
//   useEffect(() => {
//     fetchTaskInfo(selfCheck.task).then(task => {
//       if (task) {
//         const filteredItems = task.items.map(item => {
//           const filtered = item.categoryItems.filter(item =>
//             (role === 'mentor') ? item : !item.checkByMentorOnly)
//           return { ...item, categoryItems: filtered }
//         });
//         filteredItems.forEach(item => score[item.category] = []);
//         setTask({ ...task, items: filteredItems });
//         setItemsNumber(countAllItems(filteredItems));
//       }
//     })
//   }, [selfCheck])
//
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (countCheckedItems(score) === itemsNumber) {
//       const date = new Date().toLocaleDateString()
//         .split('.').reverse().join('-');
//       const { task, student } = selfCheck;
//       const checkInfo = {
//         task,
//         user,
//         student,
//         score: countPoints(score),
//         id: new Date().getTime(),
//         date,
//         time: new Date().toLocaleTimeString(),
//         items: score,
//       }
//       checkType === "self"
//         ? sendReviewRequest({ ...selfCheck, selfGrade: score, status: "PUBLISHED" })
//         : addNewScore(checkInfo);
//     }
//   }
//
//   return (
//     <div className="account">
//       <div className="checkform__wrapper">
//         <CheckFormHeader
//           title={task.title} items={task.items}
//           score={score} itemsNumber={itemsNumber}
//         />
//         <main className="checkform__main">
//           <p className="checkform__info">
//             {task.description}
//           </p>
//           <form className="checkform__items">
//             {task.items &&
//               task.items.map((category, idx) => (
//                 <CheckFormCategory
//                   role={role} key={idx} category={category}
//                   score={score} setScore={setScore}
//                 />
//               ))
//             }
//             <Button className="checkform__btn-submit"
//               onClick={handleFormSubmit}
//               type="primary" size="large"
//               icon={<SendOutlined />}
//             >
//               SEND
//             </Button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// }
// export default CheckForm;
