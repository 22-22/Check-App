import React, {useEffect, useState} from "react";
import { Input, Divider, DatePicker,Space,Button,Modal} from 'antd';
import CreateTaskCategorie from "./CreateTaskCategorie/CreateTaskCategorie";
import CreateTaskCategoryEdit from "./CreateTaskCategorie/CreateTaskCategoryEdit";
import './CreateTask.scss'
import 'antd/dist/antd.css';

export default function CreateTask() {
    let [createTaskState, setTaskState] = useState( {
        title: '',
        description: '',
        deadline:'',
        startDate:'',
        score:'',
        items:[]
    });
    let [modalState,setModalState] = useState({
        isOpen: false,
        warning:'',
        buttons:[
        <Button key="back" onClick={closeModal}>
            Ok
        </Button>]
    });
import React from "react";
import { useDispatch, useSelector } from "react-redux";

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    useEffect(() => console.log(createTaskState));
    import checkAuth from "../../utils/checkAuth";

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
function CreateTask({ history }) {
  const dispatch = useDispatch();
  const { authentication, infoUser } = useSelector(({ statesAccount }) => statesAccount);


  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/create-task");
  }, []);

    function datePickerHandler(value) {
        if(value !== null){
            const [startDate, deadLine] = value;
            setTaskState( {
                ...createTaskState,
                deadline: deadLine.format('YYYY-MM-DD'),
                startDate: startDate.format('YYYY-MM-DD'),
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
        let warning
        if(createTaskState.title === ''){
            warning = 'Введите название таски'
        }else if(createTaskState.description === ''){
            warning = 'Введите описание таски'
        }else if(createTaskState.startDate === ''){
            warning = 'Введите Дату'
        }else if(createTaskState.items.length === 0){
            warning = 'Создайте хоть 1 категорию'
        }
        console.log('Открыть моддалку')
        setModalState({
            ...modalState,
            isOpen: true,
            warning
        })
    }

    function closeModal() {
        setModalState({
            ...modalState,
            isOpen:false
        });
    }

    return (
        <div className={'main'}>
            <div className={'main__edit--panel'}>
                <div>
                    <div className={'main__edit--panel'}>
                        <Input placeholder="Task name" allowClear onChange={(event) => inputHandler(event)}/>
                        <RangePicker onChange = {datePickerHandler}/>
                    </div>
                    <TextArea placeholder="Task description" onChange={event => textAreaHandler(event)}/>
                    { itemsEdit}
                    <Button type="primary" onClick={buttonHandler} class    Name={"main__category--button"}> Add Category </Button>
                </div>
            </div>
            <div className={'main__task'}>
                <h1 className={'main__title'}>{ createTaskState.title === '' ? 'Task title' : createTaskState.title }</h1>
                <Divider />
                <p>{ createTaskState.description === '' ? 'Task description' : createTaskState.description}</p>
                <p>{ createTaskState.startDate === '' ? 'Date: ':`Date: ${createTaskState.startDate} / ${createTaskState.deadline}`}</p>
                <div className={"main__container"}>
                    { items }
                </div>
            </div>

            {/*<Button onClick={saveTaskButtonHandler}>Save Task</Button>*/}
            <Modal
                title={'Warning'}
                visible={modalState.isOpen}
                footer={modalState.buttons}
            >
                <p>{ modalState.warning}</p>
            </Modal>
        </div>
    )
}

export default CreateTask;