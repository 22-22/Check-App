import React, {useState} from "react";
import {Button, Input, InputNumber} from "antd";
import './CreateTaskCategoryItem.scss';

export default function CreateTaskCategoryItemEdit({
    categoryItem,
    setTaskState,
    createTaskState,
    categoryIndex,
    index
}) {
    const { TextArea } = Input;

    function intInputHandler(value) {
        let items = createTaskState.items;
        let score = createTaskState.items.
        reduce((acc,cur) => cur.categoryItems.
        reduce((acum,item) => item.maxScore + acum,0) + acc,0);
        if(value > 0){
            items[categoryIndex].categoryItems[index].maxScore = value;
            items[categoryIndex].categoryItems[index].minScore = 0;
        }else{
            items[categoryIndex].categoryItems[index].maxScore = 0;
            items[categoryIndex].categoryItems[index].minScore = value;
        }

        setTaskState({
            ...createTaskState,
            items:items,
            score,
        })
    }

    function textAreaHandler(event) {
        let items = createTaskState.items;
        items[categoryIndex].categoryItems[index].description = event.target.value;
        setTaskState({
            ...createTaskState,
            items:items,
        })
    }

    function deleteButtonHandler() {
        let items = createTaskState.items;
        items[categoryIndex].categoryItems.splice(index,1);
        setTaskState({
            ...createTaskState,
            items:items,
        })
    }
    function markAsMentor() {
        let items = createTaskState.items;
        console.log(categoryItem.checkByMentorOnly);
        items[categoryIndex].categoryItems[index].checkByMentorOnly = !items[categoryIndex].categoryItems[index].checkByMentorOnly
    }


    return (
        <div className={'category--item__edit'}>
            <div className={'edit--item__buttons'}>
                <InputNumber min={-1000} max={1000} defaultValue={0}   onChange={(value) =>intInputHandler(value)}/>
                <Button  onClick={markAsMentor} type = {categoryItem.checkByMentorOnly ? "primary":''} > Mark as mentor </Button>
                <Button onClick={deleteButtonHandler}>Delete Item</Button>
            </div>
            <TextArea value = {categoryItem.description} onChange = {event => textAreaHandler(event)} />
        </div>
    )

}