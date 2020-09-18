import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Space,Button,Modal, message,Typography} from 'antd';
import 'antd/dist/antd.css';
import TaskViewCategory from "./TaskViewCategory/TaskViewCategory";
import './TaskView.scss'

export default function TaskView({}) {

    const task =  {
        "title": "asx",
        "status": "",
        "description": "asxas",
        "deadline": "2020-10-28",
        "date": "2020-10-01",
        "score": 20,
        "items": [
            {
                "category": "Category",
                "categoryItems": [
                    {
                        "description": "category Item",
                        "minScore": 0,
                        "maxScore": 200,
                        "checkByMentorOnly": false
                    }
                ]
            }
        ],
        "id": 8
    }

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
                { false ? buttonBlockOne : buttonBlockTwo}
            </div>
        </div>
    )
}