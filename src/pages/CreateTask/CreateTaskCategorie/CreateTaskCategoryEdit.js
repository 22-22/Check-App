import React from "react";
import {Button, Input,Divider,Tooltip} from "antd";
import CreateTaskCategoryItemEdit from "./CreateTaskCategorieItem/CreateTaskCategoryItemEdit";


export default function CreateTaskCategoryEdit({
   category,
   index,
   setTaskState,
   createTaskState
}) {

    function deleteButtonHandler() {
        let items = createTaskState.items;
        items.splice(index,1)
        setTaskState({
            ...createTaskState,
            items:items,
        })
    }

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
            minScore: 0,
            maxScore: 0,
            checkByMentorOnly: false,
        });
        console.log(items);
        setTaskState({
            ...createTaskState,
            items:items
        })
    }

    const items =  category.categoryItems.map((e,i) => (
        <CreateTaskCategoryItemEdit
            key = {i}
            index = {i}
            categoryIndex = {index}
            categoryItem = {e}
            setTaskState = { setTaskState }
            createTaskState = { createTaskState }
        />));

    return (
        <div className={'category--edit'}>
            <Divider />
            <div className={'category--edit__buttons'}>
                <Input onChange={event => inputHandler(event)} value={category.category} placeholder={'Category description'}/>
                <Tooltip title={`Delete ${category.category}`}>
                    <Button onClick={deleteButtonHandler}>Delete</Button>
                </Tooltip>
            </div>
            <div className={'category__content'}>
                {items}
                <div className={'category--edit__add--button'}>
                    <Button onClick={buttonHandler}>Add Item</Button>
                </div>
            </div>
        </div>
    )
}