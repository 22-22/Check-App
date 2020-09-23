import React, {useEffect, useState} from "react";
import { Divider, Button,Typography } from 'antd';
import 'antd/dist/antd.css';
import TaskViewCategory from "./TaskViewCategory/TaskViewCategory";
import './TaskView.scss'
import {changeTask, fetchTaskById, sendTask} from "../../services/ServerRequest";
import {useDispatch, useSelector} from "react-redux";
import checkAuth from "../../utils/checkAuth";
import { Link } from 'react-router-dom';

export default function TaskView({history, match}) {

    const dispatch = useDispatch();
    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);

    let [task,setTaskState] = useState({
        title: '',
        status:'',
        author:`${infoUser.id}`,
        description: '',
        deadline:'',
        date:'',
        score:'',
        items:[]
    });

    useEffect(() => {console.log(task); console.log(match.params.id)})

    useEffect(() => {
        (async () => match.params.id ? setTaskState( ( (await fetchTaskById( match.params.id ))[0] ) ) : '')();
    },[]);

    React.useEffect(() => {
        !authentication && checkAuth(history, authentication, dispatch, "/create-task");
    }, []);

    const taskCategories = task.items.map((e, i) => (<TaskViewCategory
              key = {i}
              category = {e}
              index = {i}
    />));

    function publishHandler() {
        setTaskState({...task, status:'published'});

    }

    function archiveHandler() {
        setTaskState({...task, status:'archive'});
        console.log('iddd',task.id)
        changeTask(task.id,task)
    }

    const buttonBlockOne = [
        <Button onClick={publishHandler}>
            Опубликовать
        </Button>,
        <Link to={`/create-task/${match.params.id}`}>
            <Button>
                Редактировать
            </Button>
        </Link>,
        <Button onClick={archiveHandler}>
            Архивировать
        </Button>,
        <Link to='/tasks'>
            <Button>
                Вернутся к списку задач
            </Button>
        </Link>
    ];

    const buttonBlockTwo = [
        <Button>
            Создать запрос на ревью
        </Button>,
        <Link to='/tasks'>
            <Button>
                Вернутся к списку задач
            </Button>
        </Link>
    ];

    return (
        <div className={'task'}>
            <div className={'main__task'}>
                <Typography.Title level={'h1'}>
                    <h1 className={'main__title'}>{ task.title }</h1>
                </Typography.Title>
                <Divider />
                <p className={'task__description'}>{ task.description}</p>
                <p className={'task__date'}>{ `Date: ${task.date} / ${task.deadline}`}</p>
                <div className={"main__container"}>
                    { taskCategories }
                </div>
            </div>
            <div className={'task__buttons'}>
                { infoUser.role !== 'student' ?  buttonBlockTwo : buttonBlockOne }
            </div>
        </div>
    )
}