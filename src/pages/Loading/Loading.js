import React from "react";

function Loading() {
 
  return (
    <div className="loading">
      <h2 className="loading__title"> Загрузка. Подождите</h2>
      <div className="loading__content">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5"></div>
      </div>
    </div>
  );
}

export default Loading;

