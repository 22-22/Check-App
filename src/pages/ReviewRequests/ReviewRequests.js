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
  }, [authentication, dispatch, history]);
  
  let reviewRequestsData = [];
  let tasksSet = new Set();
  let tasksFilter = [];
  let studentsSet = new Set();
  let studentsFilter = [];
  let statesSet = new Set();
  let statesFilter = [];
  if (reviewRequests) {
    reviewRequests.map((reviewRequest, i) => {
      if (infoUser.role === "admin" && reviewRequest.status !== "selfCheckDraft" && reviewRequest.status !== "checkDraft") {
        reviewRequestsData.push({
          key: i+1,
          task: reviewRequest.task ? reviewRequest.task : "",
          student: reviewRequest.student ? reviewRequest.student : "",
          demo: reviewRequest.demo ? <a href={reviewRequest.demo} target="_blank" rel="noopener noreferrer">link</a> : "",
          pr: reviewRequest.PR ? <a href={reviewRequest.PR} target="_blank" rel="noopener noreferrer">link</a> : "",
          selfGrade: reviewRequest.selfGrade ? reviewRequest.selfGrade : "",
          sendingDate: reviewRequest.sendingDate ? reviewRequest.sendingDate : "",
          crossCheckSessionId: reviewRequest.crossCheckSessionId ? reviewRequest.crossCheckSessionId : "none",
          reviewRequestState: reviewRequest.status ? reviewRequest.status : "",
          actions: <>
            { reviewRequest.status && reviewRequest.status === "published" ? (
              <Link to={`/check-form/${reviewRequest.id}`}>
                <Tooltip title="Review this work">
                  <Button type="primary" shape="circle" icon={<CheckCircleOutlined />} />
                </Tooltip>
              </Link>
            ) : null }
          </>
        });
        statesSet.add(reviewRequest.status ? reviewRequest.status : null);
      } else if ((reviewRequest.status && reviewRequest.status === "published" )
        || (reviewRequest.student === infoUser.role 
        && (reviewRequest.status === "checkDraft" || reviewRequest.status === "selfCheckDraft" || reviewRequest.status === "published"))) {
        reviewRequestsData.push({
          key: i+1,
          task: reviewRequest.task ? reviewRequest.task : "",
          student: reviewRequest.student ? reviewRequest.student : "",
          demo: reviewRequest.demo ? <a href={reviewRequest.demo} target="_blank" rel="noopener noreferrer">link</a> : "",
          pr: reviewRequest.PR ? <a href={reviewRequest.PR} target="_blank" rel="noopener noreferrer">link</a> : "",
          selfGrade: reviewRequest.selfGrade ? reviewRequest.selfGrade : "",
          sendingDate: reviewRequest.sendingDate ? reviewRequest.sendingDate : "",
          crossCheckSessionId: reviewRequest.crossCheckSessionId ? reviewRequest.crossCheckSessionId : "none",
          reviewRequestState: reviewRequest.status ? reviewRequest.status : "",
          actions: <>
            { reviewRequest.student !== infoUser.id ? (
                <Link to={`/check-form/${reviewRequest.id}`}>
                  <Tooltip title="Review this work">
                    <Button type="primary" shape="circle" icon={<CheckCircleOutlined />} />
                  </Tooltip>
                </Link>
              ) : null
            }
          </>
        });
        statesSet.add(reviewRequest.status ? reviewRequest.status : null);
      }
        tasksSet.add(reviewRequest.task ? reviewRequest.task : null);
        studentsSet.add(reviewRequest.student ? reviewRequest.student : null);
        return null;
    });
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
      title: 'Demo',
      dataIndex: 'demo',
    },
    {
      title: 'PR',
      dataIndex: 'pr',
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
      filters: infoUser.role === "admin" ? statesFilter : null,
      onFilter: (value, record) => record.reviewRequestState.indexOf(value) === 0,
      sorter: infoUser.role === "admin" ? (a, b) => a.reviewRequestState.localeCompare(b.reviewRequestState) : null,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    }
  ];

  return (
    <div>
      <h2>Review requests</h2>
      <p>Pick a work you would like to review. You can filter and sort data.</p>
      <Table columns={columns} dataSource={reviewRequestsData} />
      <Link to='/review-request'><Button type="primary" icon={<FileAddOutlined />} >Request a review</Button></Link>
    </div>
  );
}

export default ReviewRequests;
