import React, {useEffect, useState} from "react";
import { Divider, Button,Typography } from 'antd';
import 'antd/dist/antd.css';
import TaskViewCategory from "./TaskViewCategory/TaskViewCategory";
import './TaskView.scss'
import {fetchTaskById} from "../../services/ServerRequest";
import {useDispatch, useSelector} from "react-redux";
import checkAuth from "../../utils/checkAuth";

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

    const buttonBlockOne = [
        <Button>
            Опубликовать
        </Button>,
        <Button>
            Редактировать
        </Button>,
        <Button>
            Архивировать
        </Button>
    ];

    const buttonBlockTwo = [
        <Button>
            Создать запрос на ревью
        </Button>,
        <Button>
            Вернутся к списку задач
        </Button>
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
                { infoUser.role === 'student' ?  buttonBlockTwo : buttonBlockOne }
            </div>
        </div>
    )
}