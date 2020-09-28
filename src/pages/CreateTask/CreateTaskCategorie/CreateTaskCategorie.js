// eslint-disable-next-line
import React, {useState} from "react";
import 'antd/dist/antd.css';
import { Divider } from 'antd';
import CreateTaskCategoryItem from "./CreateTaskCategorieItem/CreateTaskCategoryItem";
import './CreateTaskCategory.scss'


export default function CreateTaskCategorie({
     category,
     index,
     setTaskState,
     createTaskState
}){

    const items =  category.categoryItems.map((e,i) => (
        <CreateTaskCategoryItem
            key = {i}
            index = {i}
            categoryIndex = {index}
            categoryItem = {e}
            setTaskState = { setTaskState }
            createTaskState = { createTaskState }
    />));

    const score = category.categoryItems.reduce((acc,cur) => acc + cur.maxScore , 0);

    return (
        <div className={'category'}>
            <Divider style={ {'fontSize':'2rem'} }>{ `${category.category} +${score}` }</Divider>

            <div className={'category__container'}>
                { items }
            </div>

        </div>
    )
}