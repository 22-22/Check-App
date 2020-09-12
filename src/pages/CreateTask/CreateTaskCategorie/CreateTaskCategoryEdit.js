import React from "react";
import {Button, Input} from "antd";
import CreateTaskCategoryItemEdit from "./CreateTaskCategorieItem/CreateTaskCategoryItemEdit";


export default function CreateTaskCategoryEdit({
   category,
   index,
   setTaskState,
   createTaskState
}) {

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
        <CreateTaskCategoryItemEdit
            key = {i}
            index = {i}
            categoryIndex = {index}
            categoryItem = {e}
            setTaskState = { setTaskState }
            createTaskState = { createTaskState }
        />));

    return (
        <div>
            <Input onChange={event => inputHandler(event)} placeholder={'Category description'}/>
            <div className={'category__button'}>
                {items}
                <Button onClick={buttonHandler}>Add Item</Button>
            </div>
        </div>
    )
}