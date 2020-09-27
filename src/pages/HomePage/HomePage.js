import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "../../utils/checkAuth";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const statesAccount = useSelector(({ statesAccount }) => statesAccount);
  
  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/");
    console.log(statesAccount)
  }, []);

  return (
    <div className="account">
      <div className="account__content">
        <nav className="account__navigation">
          <ul className="navigation">
            <Link to="/create-task">
              <li className="navigation__link">Add new task</li>
            </Link>
            <Link to="/review-request">
              <li className="navigation__link">Request a review</li>
            </Link>
            <Link to="/review-requests">
              <li className="navigation__link">Review requests</li>
            </Link>
            <Link to="/tasks">
              <li className="navigation__link">Tasks</li>
            </Link>
            <Link to="/check-form">
              <li className="navigation__link">Check-form</li>
            </Link>
            <Link to="/scores">
              <li className="navigation__link">Reviews list</li>
            </Link>
            {/* <Link to= '/reviews'><li className="navigation__link">Reviews</li></Link> */}
          </ul>
        </nav>
        <div className="account__info">
          <h3 className="account__info-title">Your stats</h3>
          <div className="account__info-content">
            <div className="score">
              <h4 className="score__title">Score Points</h4>
              <span className="score__value">1304.2</span>
            </div>
            <div className="tasks-stats">
              <h4 className="tasks-stats__title">Completed Tasks</h4>
              <span className="tasks-stats__value">232/323</span>
            </div>
          </div>
          <div className="account-status">
          <h4 className="account-status__title">Status</h4>
          <span className="account-status__value">
            Active
          </span>
          </div>
        </div>
        <div className="account__active-tasks">
          <h3 className="active-tasks-title">active tasks</h3>
          <div className="card">
          <h3 className="card__title">active tasks</h3>
          <span className="card__subtitle">
            <a href="#" >asd</a>
          </span>
          <div className="card__description">
            текст текст текст
          </div>
          <div className="card__date-info">
            10.09.20
          </div>
          </div>
        </div>
        <div className="account__ads-list"></div>
      </div>
    </div>
  );
}

export default HomePage;
