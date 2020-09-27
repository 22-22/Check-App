import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { userLogout } from "../../redux/actions/authentication";

function Header({ history }) {
  // const { role } = useSelector(({ authentication }) => authentication);
  const dispatch = useDispatch();
  const exitAccount = () => {
    dispatch(userLogout());
    localStorage.setItem("gitHubUser", "");
  };
  React.useEffect(() => {}, []);
  return (
    <div className="header">
      <div className="header__wrapper">
      <Link to="/">
        <div className="header__logo">Check-App</div>
        </Link>
        <Link to="/authentication">
          <Button type="primary" onClick={exitAccount}>
            Log out
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
