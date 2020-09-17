import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTasks } from '../../redux/actions/reviewRequest';
import checkAuth from "../../utils/checkAuth";

import "./reviewRequest.css"
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
};


function ReviewRequest({ history }) {
    const [status, setStatus] = React.useState("published");
    const dispatch = useDispatch();

    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
     
    const { activeTasks } = useSelector(({ reviewRequest }) => reviewRequest);
    
    React.useEffect(() => {
        !authentication && checkAuth(history, authentication, dispatch, "/review-request");
        dispatch(getActiveTasks(status));
    }, [status]);

    
    console.log(activeTasks)
    const [task, setTask] = React.useState("");
    const [demo, setDemo] = React.useState("");
    const [PR, setPR] = React.useState("");

    const [form] = Form.useForm();

    const onSubmit = (event) => {
        console.log(this.state);
    }

    const onReset = () => {
        this.formRef.current.resetFields();
    };

    return (
        <div className="review-request-form">
            <Form {...layout} form={form} onFinish={onSubmit}>
                <Form.Item name="task" value={task} label="Task:" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a task"
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
                <Form.Item className="review-request-btn-block">
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="primary" htmlType="submit" className="review-request-btn">
                        Make a self check
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ReviewRequest;