import React, {useState} from "react";
import 'antd/dist/antd.css';
import { Input,Button,Divider,InputNumber} from 'antd';
import CreateTaskCategoryItem from "./CreateTaskCategorieItem/CreateTaskCategoryItem";
import './CreateTaskCategory.scss'


export default function CreateTaskCategorie({
     category,
     index,
     setTaskState,
     createTaskState
}){

    function inputHandler(event){
        let categoryItem = category;
        let items = createTaskState.items;
        categoryItem.category = event.target.value;
        items.splice(index,1, categoryItem);
        setTaskState({
            ...createTaskState,
            items
        })
    }

    function buttonHandler(){
        let items = createTaskState.items;
        items[index].categoryItems.push({
            description: 'category Item',
            score: 0
        })
        console.log(items)
        setTaskState({
            ...createTaskState,
            items:items
        })
    }

    const items =  category.categoryItems.map((e,i) => (
        <CreateTaskCategoryItem
            key = {i}
            index = {i}
            categoryIndex = {index}
            categoryItem = {e}
            setTaskState = { setTaskState }
            createTaskState = { createTaskState }
    />));

    const score = category.categoryItems.reduce((acc,cur) => acc + cur.score  ,0);

    return (
        <div className={'category'}>
            <Divider>{ `${category.category} +${score}` }</Divider>
            <Input onChange={event => inputHandler(event)} placeholder={'Category description'}/>
            <div className={'category__container'}>
                { items }
            </div>
            <div className={'category__button'}>
                <Button onClick={buttonHandler}>Add Item</Button>
            </div>
        </div>
    )
}