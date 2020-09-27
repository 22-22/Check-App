import React from "react";

function Card({data}) {
  return (
    <div className="card">
      <h3 className="card__title">{data.title}</h3>
      <span className="card__subtitle">
        <a href="#">Link to the task</a>
      </span>
  <div className="card__description">{data.description}</div>
  <div className="card__date-info">{data.editDate.substring(0,10)}/{data.deadline.substring(0,10)}</div>
    </div>
  );
}

export default Card;
