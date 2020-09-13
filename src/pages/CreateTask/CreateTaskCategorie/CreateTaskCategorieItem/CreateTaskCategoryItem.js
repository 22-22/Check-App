import React, {useState} from "react";
import 'antd/dist/antd.css';
import { Button,InputNumber,Input} from 'antd';
import './CreateTaskCategoryItem.scss'

export default function CreateTaskCategoryItem({
       categoryItem,
       setTaskState,
       createTaskState,
       categoryIndex,
       index
}) {


    return (
        <React.Fragment>
            <div className={'category--item'}>
                <div className={'category--item__content'}>
                    <p className={'category--item__description'}>{'• ' + categoryItem.description}</p>
                    <p  className={'category--item__score'}>{categoryItem.maxScore === 0 ? categoryItem.minScore : categoryItem.maxScore }</p>
                </div>
            </div>
        </React.Fragment>

    )
}