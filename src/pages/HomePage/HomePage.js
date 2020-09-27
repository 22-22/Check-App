import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "../../utils/checkAuth";
import { fetchTasks } from "../../services/ServerRequest";

import Card from "../../components/Card/Card";
function HomePage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const { infoUser } = useSelector(({ statesAccount }) => statesAccount);

  const [activeTasks, setActiveTasks] = React.useState(null);

  React.useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, "/");
    fetchTasks("published").then((res) => setActiveTasks(res));
  }, []);

  const MenuList = [
    {
      role: ["admin"],
      link: "/create-task",
      textLink: "Add new task",
    },
    {
      role: ["student"],
      link: "/review-request",
      textLink: "Request a review",
    },
    {
      role: ["student"],
      link: "/review-requests",
      textLink: "Review requests",
    },
    {
      role: ["student"],
      link: "/tasks",
      textLink: "Tasks",
    },
    {
      role: ["student"],
      link: "/check-form",
      textLink: "Check-form",
    },
    {
      role: ["admin"],
      link: "/scores",
      textLink: "Scores",
    },
  ];
  return (
    <div className="account">
      <div className="account__content">
        <div className="account__info">
          <div className="account__info-name">
            Account: <span>{infoUser.id}</span>
          </div>
          <div className="account__info-status">
            Status: <span>{infoUser.role}</span>
          </div>
        </div>
        <nav className="account__navigation">
          <ul className="navigation">
            {MenuList.map((el, index) =>
              el.role.includes(infoUser.role) ? (
                <Link to={el.link} key={index}>
                  <li className="navigation__link">{el.textLink}</li>
                </Link>
              ) : (
                ""
              )
            )}
          </ul>
        </nav>
        {/* {infoUser.role === "student" && (
          <div className="account__active-tasks">
            <h3 className="active-tasks-title">Active tasks cource</h3>
            {activeTasks &&
              activeTasks.map((task, index) => (
                <Card key={index} data={task} />
              ))}
          </div>
        )} */}
        {/* {infoUser.role === "student" && (
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
              <span className="account-status__value">Active</span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default HomePage;
