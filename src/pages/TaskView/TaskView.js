import React, {useEffect, useState} from "react";
import { Divider, Button,Typography ,Spin,Tooltip} from 'antd';
import 'antd/dist/antd.css';
import TaskViewCategory from "./TaskViewCategory/TaskViewCategory";
import './TaskView.scss'
import {changeTask, fetchTaskById, sendTask} from "../../services/ServerRequest";
import {useDispatch, useSelector} from "react-redux";
import checkAuth from "../../utils/checkAuth";
import { Link } from 'react-router-dom';
import { SendOutlined,EditOutlined,FileZipOutlined,RollbackOutlined,FolderOpenOutlined,DeleteOutlined,EyeOutlined,DownloadOutlined  } from '@ant-design/icons';

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
    let [loading,SetLoading] = useState(true);
    let taskFile = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(task));

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
        changeTask(task.id,task,{ status:'published'})
    }

    function archiveHandler() {
        changeTask(task.id,task,{ status:'archived'})
    }
    function draftHandler() {
        changeTask(task.id,task,{ status:'draft'})
    }
    function deleteHandler() {
        changeTask(task.id,task,{ status:'deleted'})
    }

    const buttonBlockOne =  () =>  {
        if(task.status === 'draft') return (
        <div className={'task__buttons--draft'}>
            <Link to={'/tasks'}>
                <Tooltip title={'Publish'}>
                    <Button type={'primary'} onClick={publishHandler} size={"large"} shape={"circle"} icon={<SendOutlined />}/>
                </Tooltip>
            </Link>
            <Link to={`/create-task/${match.params.id}`}>
                <Tooltip title={'Edit'}>
                    <Button type={'primary'}  size={"large"} shape={"circle"} icon={<EditOutlined />}/>
                </Tooltip>
            </Link>
            <Tooltip title={'Archive'}>
                <Button onClick={archiveHandler} type={'primary'}  size={"large"} shape={"circle"} icon={<FileZipOutlined />} />
            </Tooltip>
            <Link to='/tasks'>
                <Tooltip title={'Back to the tasks'}>
                    <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
                </Tooltip>
            </Link>
            <a href={`data: ${taskFile}`} download={`${task.title === '' ? 'task' : task.title}.json`}>
                <Tooltip title={`Export ${task.title}`}>
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={'large'}/>
                </Tooltip>
            </a>
        </div>);
        if(task.status === 'published') return (
            <div className={'task__buttons'}>
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
                <a href={`data: ${taskFile}`} download={`${task.title === '' ? 'task' : task.title}.json`}>
                    <Tooltip title={`Export ${task.title}`}>
                        <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={'large'}/>
                    </Tooltip>
                </a>
            </div>);

        if(task.status === 'archive') return (
            <div className={'task__buttons'}>
                <Link to={'/tasks'}>
                    <Tooltip title={'Publish'}>
                        <Button type={'primary'} onClick={publishHandler} size={"large"} shape={"circle"} icon={<SendOutlined />}/>
                    </Tooltip>
                </Link>
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
                <a href={`data: ${taskFile}`} download={`${task.title === '' ? 'task' : task.title}.json`}>
                    <Tooltip title={`Export ${task.title}`}>
                        <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={'large'}/>
                    </Tooltip>
                </a>
            </div>
        )
    };

    const buttonBlockTwo = (
        <div className={'task__button'}>
            <Link to={`/review-request/${match.params.id}`}>
                <Tooltip title={'Request a review'}>
                    <Button type={'primary'}  size={"large"} shape={"circle"} icon={<EyeOutlined />} />
                </Tooltip>
            </Link>
            <Link to='/tasks'>
                    <Tooltip title={'Back to the tasks'}>
                        <Button type={'primary'}  size={"large"} shape={"circle"} icon={<RollbackOutlined />} />
                    </Tooltip>
            </Link>
        </div>
    )

    return (
        <Spin spinning={loading}>
        <div className={'task'}>
            <div className={'main__task'}>
                <h1 className={'main__title'}>{ task.title }</h1>
                <Divider />
                <p className={'task__points'}>{`Total points: ${task.score}`}</p>
                <p className={'task__description'}>{ task.description}</p>
                <p className={'task__date'}>{ `Date: ${task.date} / ${task.deadline}`}</p>
                <div className={"main__container"}>
                    { taskCategories }
                </div>
            </div>

                { infoUser.role === 'admin' ? buttonBlockOne() : buttonBlockTwo }

        </div>
        </Spin>

    )
}