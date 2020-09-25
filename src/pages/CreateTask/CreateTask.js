import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Button,message,Spin,Tooltip} from 'antd';
import CreateTaskCategorie from "./CreateTaskCategorie/CreateTaskCategorie";
import CreateTaskCategoryEdit from "./CreateTaskCategorie/CreateTaskCategoryEdit";
import checkAuth from "../../utils/checkAuth";
import './_CreateTask.scss'
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import CreateTaskUpload from "./CreateTaskUpload/CreateTaskUpload";
import {fetchTaskById, getTaskId, sendTask} from "../../services/ServerRequest";
import { DownloadOutlined ,CheckOutlined,SaveOutlined} from '@ant-design/icons';

export default function CreateTask({history, match}) {
    const dispatch = useDispatch();
    const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);
    const id = match.params.id

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
        id: Number(id),
    });

    let taskFile = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(createTaskState));
    // useEffect(() => console.log(createTaskState))
    useEffect(() => {
        (async () => id ? setTaskState( ( (await fetchTaskById( id ))[0] ) ) : '')();
        (async () => id ? '' : setTaskState({...createTaskState,id: await getTaskId() + 1}) )();
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
        console.log(value)
        if(value !== null){
            const [date, deadLine] = value;
            setTaskState( {
                ...createTaskState,
                deadline: deadLine.format('YYYY-MM-DD HH:MM'),
                date: date.format('YYYY-MM-DD HH:MM'),
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
            message.error('Enter task title')
        }else if(createTaskState.description === ''){
            message.error('Enter task description')
        }else if(createTaskState.date === ''){
            message.error('Enter date')
        }else if(createTaskState.items.length === 0){
            message.error('Add at least one category')
        }else{
            message.success('You can save your task')
            setCanSaveState(true)
        }
    }

    function saveTaskButtonHandler() {
       sendTask(createTaskState)
    }

    const saveButton = canSave ? (

        <Link to={`/tasks/${createTaskState.id}`}>
            <Tooltip title={'Save your task '}>
                <Button onClick={saveTaskButtonHandler} shape={'circle'} size={'large'} type={'primary'}  icon = {<SaveOutlined />}/>
            </Tooltip>
        </Link>
    ):( <Tooltip title={'Check your task'}>
             <Button onClick={check} shape={'circle'} size={'large'} type={'primary'} icon={<CheckOutlined />} />
        </Tooltip>);


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
                                    <RangePicker  showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange = {datePickerHandler}/>
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
                        <p>{`Total points: ${createTaskState.score}`}</p>
                        <p>{ createTaskState.date === '' ? 'Date: ':`Date: ${createTaskState.date} / ${createTaskState.deadline}`}</p>
                        <p>{ createTaskState.description === '' ? 'Task description' : createTaskState.description}</p>
                        <div className={"main__container"}>
                            { items }
                        </div>
                    </div>
                </div>
                <div className={'main__buttons-container'}>
                    {saveButton}
                    <CreateTaskUpload setState = {setTaskState} />
                    <a href={`data: ${taskFile}`} download={`${createTaskState.title}.json`}>
                        <Tooltip title={`Export ${createTaskState.title}`}>
                            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={'large'}/>
                        </Tooltip>
                    </a>
                </div>
            </div>
        </Spin>
    )
}

