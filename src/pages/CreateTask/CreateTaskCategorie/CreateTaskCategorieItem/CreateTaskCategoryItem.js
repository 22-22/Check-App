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
    const { TextArea } = Input;
    let [editPanel,setEditPanelState] = useState(false);
    let [textAreaState,setTextAreaState] = useState('category Item');
    let [intInputState, setIntInputState] = useState(0);

    function buttonHandler() {
        if(editPanel){
            let items = createTaskState.items;
            console.log(items,items[categoryItem],categoryItem)
            items[categoryIndex].categoryItems[index].score = intInputState;
            items[categoryIndex].categoryItems[index].description = textAreaState;
            setTaskState({
                ...createTaskState,
                items:items,
            })}
        setEditPanelState(!editPanel);


    }



    return (
        <React.Fragment>
            <div className={'category--item'}>
                <div className={'category--item__content'}>
                    <p className={'category--item__description'}>{'• ' + categoryItem.description}</p>
                    <p  className={'category--item__score'}>{categoryItem.score}</p>
                </div>
            </div>
        </React.Fragment>

    )
}