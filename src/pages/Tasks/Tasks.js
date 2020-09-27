import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/actions/tasks";
import checkAuth from "../../utils/checkAuth";
import { Link } from 'react-router-dom';

import { changeTaskStatus } from '../../services/ServerRequest';

import 'antd/dist/antd.css';
import { Table, Button, Tooltip } from 'antd';
import { FileAddOutlined, EditOutlined, DeleteOutlined, FileZipOutlined, DownloadOutlined, CodeOutlined } from '@ant-design/icons';

function Tasks({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(
    ({ statesAccount }) => statesAccount
  );
  const { tasks } = useSelector(({ tasks }) => tasks);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/tasks");
    dispatch(getTasks());
  }, [authentication, dispatch, history]);
  
  let tasksData = [];
  let taskFile = '';
  let taskTitle = '';
  let authorSet = new Set();
  let authorFilter = [];
  let statesSet = new Set();
  let statesFilter = [];
  if (tasks) {
    tasks.map((task, i) => {
      if (task.status !== "deleted") {
        taskTitle = task.title ? task.title : "Task title";
        if (infoUser.role === "admin") {
          taskFile = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(task));
          tasksData.push({
            key: i+1,
            task: task.title ? <Link to={`/tasks/${task.id}`}>{task.title}</Link> : "",
            author: task.author ? task.author : "",
            maxScore: task.maxScore ? task.maxScore : "",
            editDate: task.editDate ? task.editDate : "",
            date: task.date ? task.date : "",
            deadline: task.deadline ? task.deadline : "",
            taskState: task.status ? task.status : "",
            actions: <><Link to={`/create-task/${task.id}`}><Tooltip title={`Edit ${taskTitle}`}><Button type="primary" shape="circle" icon={<EditOutlined />} /></Tooltip></Link>
              <a href={`data: ${taskFile}`} download={`${taskTitle}.json`}><Tooltip title={`Export ${taskTitle}`}><Button type="primary" shape="circle" icon={<DownloadOutlined />} /></Tooltip></a>
              { task.status !== 'archived' ? (
                <Tooltip title={`Archive ${taskTitle}`}><Button type="primary" shape="circle" icon={<FileZipOutlined />} onClick={() => changeTaskStatus("archived", task.id)} /></Tooltip>
              ) : null }
              <Tooltip title={`Delete ${taskTitle}`}><Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => changeTaskStatus("deleted", task.id)} /></Tooltip>
              { task.status === 'published' ? (
                <Link to={`/review-request/${task.id}`}><Tooltip title={`Submit ${taskTitle}`}><Button type="primary" shape="circle" icon={<CodeOutlined />} /></Tooltip></Link>
              ) : null }
            </>
          });
          authorSet.add(task.author);
          statesSet.add(task.status)
        } else if (task.status === 'published') {
          tasksData.push({
            key: i+1,
            task: task.title ? <Link to={`/tasks/${task.id}`}>{task.title}</Link> : "",
            author: task.author ? task.author : "",
            maxScore: task.maxScore ? task.maxScore : "",
            editDate: task.editDate ? task.editDate : "",
            date: task.date ? task.date : "",
            deadline: task.deadline ? task.deadline : "",
            taskState: task.status ? task.status : "",
            actions: <Link to={`/review-request/${task.id}`}><Tooltip title={`Submit ${taskTitle}`}><Button type="primary" shape="circle" icon={<CodeOutlined />} /></Tooltip></Link>
          });
          authorSet.add(task.author);
          statesSet.add(task.status)
        }
      };
      return null;
    });
    for (let author of authorSet) authorFilter.push({text: author, value: author});
    for (let states of statesSet) statesFilter.push({text: states, value: states});
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.task.props.children.localeCompare(b.task.props.children),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      filters: authorFilter,
      onFilter: (value, record) => record.author.indexOf(value) === 0,
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Max score',
      dataIndex: 'maxScore',
      sorter: (a, b) => a.maxScore - b.maxScore,
    },
    {
      title: 'Start date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: (a, b) => a.deadline.localeCompare(b.deadline),
    },
    {
      title: 'State',
      dataIndex: 'taskState',
      filters: infoUser.role === "admin" ? statesFilter : null,
      onFilter: (value, record) => record.taskState.indexOf(value) === 0,
      sorter: infoUser.role === "admin" ? (a, b) => a.taskState.localeCompare(b.taskState) : null,
    },
    {
      title: 'Edit date',
      dataIndex: 'editDate',
      sorter: (a, b) => a.editDate.localeCompare(b.editDate),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    }
  ];

  return (
    <div>
      <h2>Tasks</h2>
      <p>This is the tasks list. You can filter and sort data.</p>
      <Table columns={columns} dataSource={tasksData} />
      {
        infoUser.role === "admin" ? (
          <Link to='/create-task'><Button type="primary" icon={<FileAddOutlined />} >Add new task</Button></Link>
        ) : null
      }
    </div>
  );
}

export default Tasks;
