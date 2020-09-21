import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTasks } from '../../redux/actions/reviewRequest';
import { fetchTaskById } from '../../services/ServerRequest';
import checkAuth from "../../utils/checkAuth";

import "./_ReviewRequest.scss";
import { Form, Input, Button, Select } from 'antd';

import CheckForm from '../CheckForm/CheckForm'

const { Option } = Select;

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
}


function ReviewRequest({ history, match }) {
    const [status, setStatus] = React.useState("published");
    const dispatch = useDispatch();

    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
     
    const { activeTasks } = useSelector(({ reviewRequest }) => reviewRequest);
    
    React.useEffect(() => {
        !authentication && checkAuth(history, authentication, dispatch, "/review-request");
        dispatch(getActiveTasks(status));
    }, [status]);
    const [task, setTask] = React.useState("");
    const [demo, setDemo] = React.useState("");
    const [PR, setPR] = React.useState("");
    const [revReqObj, setRevReqObj] = React.useState("");

    if (match.params.id) {
      fetchTaskById(match.params.id)
        .then(tasks => setTask(tasks[0].title))
    }

    const [form] = Form.useForm();

    const onSubmit = (event) => {
      setRevReqObj({
        "id": `rev-req-${new Date().getTime()}`,
        "crossCheckSessionId": null,
        "author": `${infoUser.id}`,
        "task": task,
        "state": "DRAFT",
        "demo": demo,
        "PR": PR,
        "selfGrade": {}
      })
    }

    const onReset = () => {
      form.resetFields();
    };

    if (revReqObj) {
      return (<CheckForm revReqObj={revReqObj} checkType = "self" />)
    } else {
      return (
          <div className="review-request-form">
              <p className="review-request-form-title">Request a review</p>
              <Form {...layout} form={form} onFinish={onSubmit}>
                  <Form.Item name="task" value={task} label="Task:" rules={[{ required: true }]}>
                      <Select
                      placeholder={task ? task : "select a task"}
                      onChange={value => setTask(value)}
                      >
                          {activeTasks ? activeTasks.map(task => <Option value={task.title} key={task.title}>{task.title}</Option>) : ''}
                      </Select>
                  </Form.Item>
                  <Form.Item name="demo-link" value={demo} label="Demo:" rules={[{ required: true }]}>
                      <Input type="text" placeholder="add link to your demo"
                      onChange={e => setDemo(e.target.value)}/>
                  </Form.Item>
                  <Form.Item name="PR-link" value={PR} label="Pull Request:" rules={[{ required: true }]}>
                      <Input type="text" placeholder="add link to your pull request"
                      onChange={e => setPR(e.target.value)}/>
                  </Form.Item>
                  <Form.Item className="review-request-btn-block" {...tailLayout}>
                      <Button htmlType="button" onClick={onReset} className="review-request-btn">
                          Reset
                      </Button>
                      <Button type="primary" htmlType="submit" >
                          Make a self check
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      )
    }
}

export default ReviewRequest;
