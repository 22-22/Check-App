import React from "react";
import ScoreReviewItem from "./ScoreReviewItem";
import { Divider } from 'antd';

function ScoreReviewCategory(props) {
    return (
        <div className="score-review-category-container">
            <Divider orientation="left"><p className="score-review-category" >{props.categoryObj.category}</p></Divider>
            { props.categoryObj.categoryItems.map((itemObj, itemI) => <ScoreReviewItem itemObj={itemObj} itemI={itemI} marks={props.marks} category={props.categoryObj.category} key={itemI} /> )}
        </div>   
    )
} 

export default ScoreReviewCategory;

