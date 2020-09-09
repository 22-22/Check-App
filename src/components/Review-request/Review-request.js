import React from "react";

class ReviewRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.tasks[0],
            demo: '',
            PR: '',
        }
    }

    onSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
    }

    onTaskSelect = (event) => {
        this.setState({task: event.target.value});
    }

    onChangeDemo = (event) => {
        this.setState({demo: event.target.value});
    }

    onChangePR = (event) => {
        this.setState({PR: event.target.value});
    }
    render() {
        return (
            <div className="review-request-form">
                <form onSubmit={this.onSubmit}>
                    <label> 
                        Task: 
                        <select name="task" value={this.state.task} onChange={this.onTaskSelect}>
                            {this.props.tasks.map(task => <option value={task} key={task}>{task}</option>)}
                        </select>
                    </label>
                    <p><label> Demo: <input type="text" name="demo-link" value={this.state.demo} placeholder="add link to your demo"
                           onChange={this.onChangeDemo}/></label></p>
                    <p><label> Pull Request: <input type="text" name="PR-link" value={this.state.PR} placeholder="add link to your pull request"
                           onChange={this.onChangePR}/></label></p>
                    <p><input type="submit" value="make a self check" /></p>
                    <p><input type="submit" value="later" /></p>
                </form>
            </div>
        )
    }
}

export default ReviewRequest;