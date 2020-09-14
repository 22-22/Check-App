import React from "react";
import { Modal, Form, Input, Button, Select } from 'antd';
import "./reviewRequest.css"

const { Option } = Select;

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
};

class ReviewRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.tasks[0],
            demo: '',
            PR: '',
            visible: true,
        }
    }

    formRef = React.createRef();

    onSubmit = (event) => {
        console.log(this.state);
        this.setState({ visible: false });
    }

    onTaskSelect = (value) => {
        this.setState({task: value});
    }

    onChangeDemo = (event) => {
        this.setState({demo: event.target.value});
    }

    onChangePR = (event) => {
        this.setState({PR: event.target.value});
    }

    onReset = () => {
        this.formRef.current.resetFields();
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    
    render() {
        return (
            <div className="review-request-form">
                <Modal
                    title="Make a review request"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout} ref={this.formRef} onFinish={this.onSubmit}>
                        <Form.Item name="task" value={this.state.task} label="Task:" rules={[{ required: true }]}>
                            <Select
                            placeholder="Select a task"
                            onChange={this.onTaskSelect}
                            >
                                {this.props.tasks.map(task => <Option value={task} key={task}>{task}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="demo-link" value={this.state.demo} label="Demo:" rules={[{ required: true }]}>
                            <Input type="text" placeholder="add link to your demo"
                            onChange={this.onChangeDemo}/>
                        </Form.Item>
                        <Form.Item name="PR-link" value={this.state.PR} label="Pull Request:" rules={[{ required: true }]}>
                            <Input type="text" placeholder="add link to your pull request"
                            onChange={this.onChangePR}/>
                        </Form.Item>
                        <Form.Item className="review-request-btn-block">
                            <Button type="primary" htmlType="submit" className="review-request-btn">
                                Make a self check
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                
            </div>
        )
    }
}

export default ReviewRequest;