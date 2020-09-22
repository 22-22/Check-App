import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Button,message,Spin} from 'antd';
import CreateTaskCategorie from "./CreateTaskCategorie/CreateTaskCategorie";
import CreateTaskCategoryEdit from "./CreateTaskCategorie/CreateTaskCategoryEdit";
import checkAuth from "../../utils/checkAuth";
import './_CreateTask.scss'
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import CreateTaskUpload from "./CreateTaskUpload/CreateTaskUpload";
import {fetchTaskById, getTaskId, sendTask} from "../../services/ServerRequest";

export default function CreateTask({history, match}) {
    const dispatch = useDispatch();
    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
    const id = match.params.id;
    console.log(id)

    let [loading,setLoading] = useState(id !== undefined);
    let [canSave,setCanSaveState] = useState(false)
    let [createTaskState, setTaskState] = useState( {
        title: '',
        status:'draft',
        author:`${infoUser.id}`,
        description: '',
        deadline:'',
        date:'',
        score:'',
        items:[],
        id
    });

    useEffect(() => console.log(createTaskState))
    useEffect(() => {
        (async () => id ? setTaskState( ( (await fetchTaskById( id ))[0] ) ) : '')();
        (async () => setTaskState({...createTaskState,id: await getTaskId() + 1}))();
        setLoading(false)
    },[]);

    React.useEffect(() => {
      !authentication && checkAuth(history, authentication, dispatch, "/create-task");
    }, []);


    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

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
    function check() {
        if(createTaskState.title === ''){
            message.error('Введите название таски')
        }else if(createTaskState.description === ''){
            message.error('Введите описание таски')
        }else if(createTaskState.date === ''){
            message.error('Введите Дату')
        }else if(createTaskState.items.length === 0){
            message.error('Создайте хоть 1 категорию')
        }else{
            message.success('Вы можете сохранить задание')
            setCanSaveState(true)
        }
    }

    function saveTaskButtonHandler() {
       sendTask(createTaskState)
    }

    const saveButton = canSave ? (
        <Link to={`/tasks/${createTaskState.id}`}>
            <Button onClick={saveTaskButtonHandler}>Save</Button>
        </Link>
    ):<Button onClick={check}>Check</Button>


    return (
        <Spin spinning={loading} size={'large'}>
            <div className={'main'}>
                <div className={'main__content'}>
                    <div className={'main__edit--panel'}>
                            <h1 className={'edit--panel__title'}> Edit panel</h1>
                            <Divider />
                            <div className={'edit--panel__head'}>
                                <div className={'edit--panel__header'}>
                                    <Input placeholder="Task name" value={createTaskState.title} allowClear onChange={(event) => inputHandler(event)}/>
                                    <RangePicker  onChange = {datePickerHandler}/>
                                </div>
                                <TextArea placeholder="Task description" value={createTaskState.description} onChange={event => textAreaHandler(event)}/>
                            </div>
                            <div className={'edit--panel__content'}>
                                { itemsEdit}
                            </div>
                            <div className={'edit--panel__button'}>
                                <Button type="primary" onClick={buttonHandler} className={"main__category--button"} > Add Category </Button>
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
                </div>
                {saveButton}
                <CreateTaskUpload setState = {setTaskState} />
            </div>
        </Spin>
    )
}

