import React from "react";
import TaskViewCategoryItem from "./TaskViewCategoryItem/TaskViewCategoryItem";
import {Divider} from "antd";
import CreateTaskCategoryItem
    from "../../CreateTask/CreateTaskCategorie/CreateTaskCategorieItem/CreateTaskCategoryItem";

export default function TaskViewCategory({
    category,
}) {
    const categoryItems = category.categoryItems.map((e, i) => (<TaskViewCategoryItem
        categoryItem = {e}
        key = {i}
    />));

    const score = category.categoryItems.reduce((acc,cur) => acc + cur.maxScore , 0);

    return (
        <div className={'category'}>
            <Divider>{ `${category.category} +${score}` }</Divider>

            <div className={'category__container'}>
                { categoryItems }
            </div>

        </div>
    )
}