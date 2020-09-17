import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Space,Button,Modal, message} from 'antd';
import 'antd/dist/antd.css';
import CreateTaskCategorie from "../CreateTask/CreateTaskCategorie/CreateTaskCategorie";

export default function TaskView({task}) {

    const taskCategories = task.items.map((e, i) => (<TaskViewCategory
              key = {i}
              category = {e}
              index = {i}
    />));
    return (
        <div className={'task'}>
            <div className={'task__content'}>
                { taskCategories }
            </div>
            <div className={'task__buttons'}>

            </div>
        </div>
    )
}