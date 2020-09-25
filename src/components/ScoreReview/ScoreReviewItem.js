import React from "react";


function ScoreReviewItem(props) {
    return (
        <div className="score-review-item">
            <div className="score-review-item-description-comment">
                <p className="score-review-item-description">{props.itemObj.description}</p>
                {props.marks[props.category][props.itemI]["comment"] ? <p className="score-review-item-comment">comment: {props.marks[props.category][props.itemI]["comment"]}</p> : ""}
            </div>
            
            <p className="score-review-marks">{`${props.marks[props.category][props.itemI]["score"]}/${props.itemObj.maxScore}`}</p>
        </div>
    )
}

export default ScoreReviewItem;