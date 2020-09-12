import React from "react";
import { useSelector } from "react-redux";

import { getUsersByRole } from "../../services/ServerRequest";


function UserList({ category, setGitHubId, gitHubId }) {
  const [userList, setUserList] = React.useState(null);

  React.useEffect(() => {
    getUsersByRole(category).then((data) => setUserList(data));
  }, []);

  return (
    <div className="list">
      <h3 className="list__title">{category}</h3>

      {userList &&
        userList.map(({ id, role, courses }, index) => (
          <div key={index} className={`list__item ${gitHubId === id && 'list__item_selected'}`} onClick={()=> setGitHubId(id)}>
            <span className="list__item-title">
              GitHub: <span>{id}</span>
            </span>
            <br />
            <span className="list__item-subtitle">
              Role:<span>{role}</span>
            </span>
            <div className="description list__item-description">
              {courses && (
                <span className="description__item">
                  Active course: <span>{courses.active[0]}</span>
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserList;
