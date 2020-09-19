import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Space,Button,Modal, message} from 'antd';
import CreateTaskCategorie from "./CreateTaskCategorie/CreateTaskCategorie";
import CreateTaskCategoryEdit from "./CreateTaskCategorie/CreateTaskCategoryEdit";
import checkAuth from "../../utils/checkAuth";
import './_CreateTask.scss'
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import CreateTaskUpload from "./CreateTaskUpload/CreateTaskUpload";
import {sendTask} from "../../services/ServerRequest";

export default function CreateTask({history, match}) {
    const dispatch = useDispatch();
    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
    let [createTaskState, setTaskState] = useState( {
        title: '',
        author: `${infoUser.id}`,
        description: '',
        deadline:'',
        date:'',
        score:'',
        items:[]
    });
    
    console.log('I want to edit task with id', match.params.id);

    React.useEffect(() => {
      !authentication && checkAuth(history, authentication, dispatch, "/create-task");
    }, []);

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    useEffect(() => console.log(createTaskState));


    const items = createTaskState.items.map((e, i) => (<CreateTaskCategorie
        key = {i}
        category = {e}
        index = {i}
        setTaskState = {setTaskState}
        createTaskState = {createTaskState}
    />));

    const itemsEdit = createTaskState.items.map((e, i) => (<CreateTaskCategoryEdit
        key = {i}
        category = {e}
        index = {i}
        setTaskState = {setTaskState}
        createTaskState = {createTaskState}
    />));

    function inputHandler (event) {
        setTaskState({ ...createTaskState, title: event.target.value })
    }
    
    function textAreaHandler(event) {
        console.log(event.target.value )
        setTaskState({ ...createTaskState, description  : event.target.value })
    }



    function datePickerHandler(value) {
        if(value !== null){
            const [date, deadLine] = value;
            setTaskState( {
                ...createTaskState,
                deadline: deadLine.format('YYYY-MM-DD'),
                date: date.format('YYYY-MM-DD'),
            })
        }
    }

    function buttonHandler() {
        let items = createTaskState.items;

        setTaskState({
            ...createTaskState,
            items: items.concat([{
                category:'Category',
                categoryItems:[],
            }])
        })
    }

    function saveTaskButtonHandler() {
        if(createTaskState.title === ''){
           message.error('Введите название таски')
        }else if(createTaskState.description === ''){
            message.error('Введите описание таски')
        }else if(createTaskState.date === ''){
            message.error('Введите Дату')
        }else if(createTaskState.items.length === 0){
            message.error('Создайте хоть 1 категорию')
        }else{
            sendTask(createTaskState)
        }

    }

    return (
        <div className={'main'}>
            <div className={'main__edit--panel'}>
                    <h1 className={'edit--panel__title'}> Edit panel</h1>
                    <Divider />
                    <div className={'edit--panel__head'}>
                        <div className={'edit--panel__header'}>
                            <Input placeholder="Task name" allowClear onChange={(event) => inputHandler(event)}/>
                            <RangePicker onChange = {datePickerHandler}/>
                        </div>
                        <TextArea placeholder="Task description" onChange={event => textAreaHandler(event)}/>
                    </div>
                    <div className={'edit--panel__content'}>
                        { itemsEdit}
                    </div>
                    <div className={'edit--panel__button'}>
                        <Button type="primary" onClick={buttonHandler} class  Name={"main__category--button"} > Add Category </Button>
                    </div>
            </div>
            <div className={'main__task'}>
                <h1 className={'main__title'}>{ createTaskState.title === '' ? 'Task title' : createTaskState.title }</h1>
                <Divider />
                <p>{ createTaskState.description === '' ? 'Task description' : createTaskState.description}</p>
                <p>{ createTaskState.date === '' ? 'Date: ':`Date: ${createTaskState.date} / ${createTaskState.deadline}`}</p>
                <div className={"main__container"}>
                    { items }
                </div>
            </div>

           <Button onClick={saveTaskButtonHandler}>Save Task</Button>
            <CreateTaskUpload/>
        </div>
    )
}

