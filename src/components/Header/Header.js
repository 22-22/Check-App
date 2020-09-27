import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { userLogout } from "../../redux/actions/authentication";

import { Button } from 'antd';
import { LogoutOutlined, FireTwoTone } from '@ant-design/icons';

function Header({history}) {
  const { infoUser } = useSelector(({ statesAccount }) => statesAccount);
  const dispatch = useDispatch();
  const exitAccount = () => {
    dispatch(userLogout());
    localStorage.setItem("gitHubUser", "");
  };
  React.useEffect(()=>{
  },[])
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="logo header__logo"><FireTwoTone style={{ fontSize: '16px' }} /> The best logo</div>
        
          <nav className="header__navigation">
            <ul className="navigation">
              <Link to='/home'><li className="navigation__link">Home</li></Link>
              <Link to='/tasks'><li className="navigation__link">Tasks</li></Link>
              { infoUser.role === "admin" ? (
                <Link to='/create-task'><li className="navigation__link">Add new task</li></Link>
              ) : null }
              <Link to='/review-request'><li className="navigation__link">Cross-check: submit</li></Link>
              <Link to='/review-requests'><li className="navigation__link">Cross-check: review</li></Link>
              <Link to= '/drafts'><li className="navigation__link">Drafts</li></Link>
              <Link to='/reviews'><li className="navigation__link">Reviews list</li></Link>
            </ul>
          </nav>
          <Link to='/authentication'><Button type="primary" icon={<LogoutOutlined />} onClick={exitAccount} >Sign out</Button></Link>
          
      </div>
    </div>
  );
}

export default Header;
