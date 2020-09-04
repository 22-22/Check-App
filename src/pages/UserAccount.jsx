import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/actions/authentication";
import { Loading } from "../pages";

import checkAuth from "../utils/checkAuth";

const PAGE = {
  user: [
    "Страница",
    "Еще страница",
    "Еще еще страница",
    "Очередная страница",
    "Последняя страница",
  ],
  admin: [
    "Страница главного",
    "Еще страница главного",
    "Еще еще страница главного",
    "Очередная страница главного",
    "Последняя страница главного",
  ],
};
function UserAccount({ history }) {
  const dispatch = useDispatch();
  const { authentication, role } = useSelector(
    ({ authentication }) => authentication
  );

  const exitAccount = () => {
    dispatch(userLogout());
    localStorage.setItem("gitHubUser", "");
  };
  React.useEffect(() => {
    checkAuth(history, authentication, dispatch, "/account");
  }, [authentication]);

  return !authentication ? (
    <Loading />
  ) : (
    <div className="account">
      <div className="account__header">
      <button onClick={exitAccount}>выйти из аккаунта</button>
      </div>
    <div className="account__content">
      <div className="account-tiles">
        {PAGE[role].map((el, index) => (
          <div key={index} className={`account__tile account__tile-${index+1}`}>{el}</div>
        ))}
      </div>
    
    </div>
    </div>
  );
}

export default UserAccount;
