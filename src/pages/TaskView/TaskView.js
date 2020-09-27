import React, {useEffect, useState} from "react";
import { Divider, Button,Typography ,Spin,Tooltip} from 'antd';
import 'antd/dist/antd.css';
import TaskViewCategory from "./TaskViewCategory/TaskViewCategory";
import './TaskView.scss'
import {changeTask, fetchTaskById, sendTask} from "../../services/ServerRequest";
import {useDispatch, useSelector} from "react-redux";
import checkAuth from "../../utils/checkAuth";
import { Link } from 'react-router-dom';
import { SendOutlined,EditOutlined,FileZipOutlined,RollbackOutlined,FolderOpenOutlined,DeleteOutlined  } from '@ant-design/icons';

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
    let [loading,SetLoading] = useState(true)

    useEffect(() => {console.log(task); console.log(match.params.id)})

    useEffect(() => {
        (async () => {if(match.params.id) { setTaskState( ( (await fetchTaskById( match.params.id ))[0] ) ) ;SetLoading(false)} })();
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
        changeTask(task.id,task,{ status:'published',})
    }

    function archiveHandler() {
        changeTask(task.id,task,{ status:'archive'})
    }
    function draftHandler() {
        changeTask(task.id,task,{ status:'draft'})
    }
    function deleteHandler() {
        changeTask(task.id,task,{ status:'delete'})
    }

    const buttonBlockOne =  () =>  {
        if(task.status === 'draft') return [
        <Tooltip title={'Publish'}>
            <Button type={'primary'} onClick={publishHandler} size={"large"} shape={"circle"} icon={<SendOutlined />}/>
        </Tooltip>,
        <Link to={`/create-task/${match.params.id}`}>
            <Tooltip title={'Edit'}>
                <Button type={'primary'}  size={"large"} shape={"circle"} icon={<EditOutlined />}/>
            </Tooltip>
        </Link>,
        <Tooltip title={'Archive'}>
            <Button onClick={archiveHandler} type={'primary'}  size={"large"} shape={"circle"} icon={<FileZipOutlined />} />
        </Tooltip>,
        <Link to='/tasks'>
            <Tooltip title={'Back to the tasks'}>
                <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
            </Tooltip>
        </Link> ];
        if(task.status === 'published') return (
            <React.Fragment>
                <Tooltip title={'Save as Draft'}>
                    <Button type={'primary'} onClick={draftHandler} size={"large"} shape={"circle"} icon={<FolderOpenOutlined />}  />
                </Tooltip>
                <Link to={`/create-task/${match.params.id}`}>
                    <Tooltip title={'Edit'}>
                        <Button type={'primary'}  size={"large"} shape={"circle"} icon={<EditOutlined />}/>
                    </Tooltip>
                </Link>
                <Tooltip title={'Delete'}>
                    <Button onClick={deleteHandler}  type={'primary'}  size={"large"} shape={"circle"} icon={<DeleteOutlined />}/>
                </Tooltip>
                <Tooltip title={'Archive'}>
                    <Button onClick={archiveHandler} type={'primary'}  size={"large"} shape={"circle"} icon={<FileZipOutlined />} />
                </Tooltip>
                <Link to='/tasks'>
                    <Tooltip title={'Back to the tasks'}>
                        <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
                    </Tooltip>
                </Link>
            </React.Fragment>)

        if(task.status === 'archive') return (
            <React.Fragment>
                <Tooltip title={'Publish'}>
                    <Button type={'primary'} onClick={publishHandler} size={"large"} shape={"circle"} icon={<SendOutlined />}/>
                </Tooltip>
                <Link to={`/create-task/${match.params.id}`}>
                    <Tooltip title={'Edit'}>
                        <Button type={'primary'}  size={"large"} shape={"circle"} icon={<EditOutlined />}/>
                    </Tooltip>
                </Link>
                <Tooltip title={'Save as Draft'}>
                    <Button type={'primary'} onClick={draftHandler} size={"large"} shape={"circle"} icon={<FolderOpenOutlined />}  />
                </Tooltip>
                <Tooltip title={'Delete'}>
                    <Button onClick={deleteHandler}  type={'primary'}  size={"large"} shape={"circle"} icon={<DeleteOutlined />}/>
                </Tooltip>
                <Link to='/tasks'>
                    <Tooltip title={'Back to the tasks'}>
                        <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
                    </Tooltip>
                </Link>
            </React.Fragment>
        )
    };

    const buttonBlockTwo = [
        <Button>
            Создать запрос на ревью
        </Button>,
        <Link to='/tasks'>
            <Link to='/tasks'>
                <Tooltip title={'Back to the tasks'}>
                    <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
                </Tooltip>
            </Link>
        </Link>
    ];

    return (
        <Spin spinning={loading}>
        <div className={'task'}>
            <div className={'main__task'}>
                <Typography.Title level={'h1'}>
                    <h1 className={'main__title'}>{ task.title }</h1>
                </Typography.Title>
                <Divider />
                <p className={'task__points'}>{`Total points: ${task.score}`}</p>
                <p className={'task__description'}>{ task.description}</p>
                <p className={'task__date'}>{ `Date: ${task.date} / ${task.deadline}`}</p>
                <div className={"main__container"}>
                    { taskCategories }
                </div>
            </div>
            <div className={'task__buttons'}>
                { infoUser.role !== 'student' ?  buttonBlockTwo : buttonBlockOne() }
            </div>
        </div>
        </Spin>

    )
}