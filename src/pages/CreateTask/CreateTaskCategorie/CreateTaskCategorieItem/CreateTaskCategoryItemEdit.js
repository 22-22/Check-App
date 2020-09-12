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
    let [textAreaState,setTextAreaState] = useState('category Item');
    let [intInputState, setIntInputState] = useState(0);

    const { TextArea } = Input;


    function intInputHandler(value) {
        let items = createTaskState.items;
        items[categoryIndex].categoryItems[index].score = value;
        setTaskState({
            ...createTaskState,
            items:items,
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
    function buttonHandler() {

            let items = createTaskState.items;
            console.log(items,items[categoryItem],categoryItem)
            items[categoryIndex].categoryItems[index].score = intInputState;

            setTaskState({
                ...createTaskState,
                items:items,
            })


    }


    return (
        <div className={'category--item__edit'}>
            <div>
                <InputNumber min={-1000} max={1000} defaultValue={0}   onChange={(value) =>intInputHandler(value)}/>
                <Button onClick={deleteButtonHandler}>Delete Item</Button>
            </div>
            <TextArea value = {categoryItem.description} onChange = {event => textAreaHandler(event)} />

        </div>
    )

}