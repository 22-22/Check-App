import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewRequests } from "../../redux/actions/reviewRequests";
import checkAuth from "../../utils/checkAuth";
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Table, Button, Tooltip } from 'antd';
import { FileAddOutlined, CheckCircleOutlined } from '@ant-design/icons';

function ReviewRequests({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(
    ({ statesAccount }) => statesAccount
  );
  const { reviewRequests } = useSelector(({ reviewRequests }) => reviewRequests);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/reviewRequests");
    dispatch(getReviewRequests());
  }, []);
  
  let reviewRequestsData = [];
  let tasksSet = new Set();
  let tasksFilter = [];
  let studentsSet = new Set();
  let studentsFilter = [];
  let statesSet = new Set();
  let statesFilter = [];
  if (reviewRequests) {
    reviewRequests.map((reviewRequest, i) => {reviewRequestsData.push(
      {key: i+1,
       task: reviewRequest.task,
       student: reviewRequest.student,
       selfGrade: reviewRequest.selfGrade,
       sendingDate: reviewRequest.sendingDate,
       crossCheckSessionId: reviewRequest.crossCheckSessionId,
       reviewRequestState: reviewRequest.state,
       actions: <Link to={`/check-form/${reviewRequest.id}`}><Tooltip title="Review this work"><Button type="primary" shape="circle" icon={<CheckCircleOutlined />} /></Tooltip></Link>});
       tasksSet.add(reviewRequest.task);
       studentsSet.add(reviewRequest.student);
       statesSet.add(reviewRequest.state)});
    for (let task of tasksSet) tasksFilter.push({text: task, value: task});
    for (let student of studentsSet) studentsFilter.push({text: student, value: student});
    for (let state of statesSet) statesFilter.push({text: state, value: state});
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      filters: tasksFilter,
      onFilter: (value, record) => record.task.indexOf(value) === 0,
      sorter: (a, b) => a.task.localeCompare(b.task),
    },
    {
      title: 'Student',
      dataIndex: 'student',
      filters: studentsFilter,
      onFilter: (value, record) => record.student.indexOf(value) === 0,
      sorter: (a, b) => a.student.localeCompare(b.student),
    },
    {
      title: 'Self evaluation',
      dataIndex: 'selfGrade',
      sorter: (a, b) => a.selfGrade - b.selfGrade,
    },
    {
      title: 'Sending Date',
      dataIndex: 'sendingDate',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.sendingDate.localeCompare(b.sendingDate),
    },
    {
      title: 'Cross-check session',
      dataIndex: 'crossCheckSessionId',
      sorter: (a, b) => a.crossCheckSessionId.localeCompare(b.crossCheckSessionId),
    },
    {
      title: 'State',
      dataIndex: 'reviewRequestState',
      filters: statesFilter,
      onFilter: (value, record) => record.reviewRequestState.indexOf(value) === 0,
      sorter: (a, b) => a.reviewRequestState.localeCompare(b.reviewRequestState),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    }
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div className="account">
      <div className="account__header">
        <h2 className="account__title">Review requests</h2>
        <h2>This is the review requests list</h2>
        <Table columns={columns} dataSource={reviewRequestsData} onChange={onChange} />
        <Link to='/review-request'><Button type="primary" icon={<FileAddOutlined />} >Request a review</Button></Link>
      </div>
    </div>
  );
}

export default ReviewRequests;
