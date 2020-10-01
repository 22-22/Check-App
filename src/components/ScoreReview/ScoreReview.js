import React from "react";
import ScoreReviewCategory from "./ScoreReviewCategory";
import { fetchTask } from '../../services/ServerRequest';

import './_ScoreReview.scss';
import { Modal, Button } from 'antd';

function ScoreReview( props ) {
  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState('');

  const openModal = () => {
    fetchTask(props.description.task)
      .then(task => {
        setItems(task[0].items);
      })
      .then(() => {
        setVisible(true);
      })
    
  }

  const closeModal = () => {
    setVisible(false);
    setItems('');
  }

  return (
    <>
        <Button type="primary" onClick={openModal}>
          View details
        </Button>
        <Modal
          title={props.description.task}
          centered
          visible={visible}
          onCancel={closeModal}
          width={1000}
          footer={[
            <Button type="primary" key={props.description.task} htmlType="button" onClick={() => setVisible(false)}>
              OK
            </Button>,
          ]}
        >
          <p className="score-review-subtitle">student: {props.description.student}, reviewer: {props.description.reviewer}</p>
          {items ? items.map((categoryObj, categoryI) =><ScoreReviewCategory categoryObj={categoryObj} marks={props.description.items} key={categoryI} /> ) : ""}
        </Modal>
      </>
  );
}

export default ScoreReview;
