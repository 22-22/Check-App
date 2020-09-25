import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { userLogout } from "../../redux/actions/authentication";


function Header({history}) {
  // const { role } = useSelector(({ authentication }) => authentication);
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
        <div className="logo header__logo">Самый лучший логотип</div>
        
          <nav className="header__navigation">
            <ul className="navigation">
              <Link to= '/home'><li className="navigation__link">home</li></Link>
              <Link to= '/create-task'><li className="navigation__link">create-task</li></Link>
              <Link to= '/review-request'><li className="navigation__link">review-request</li></Link>
              <Link to= '/tasks'><li className="navigation__link">tasks</li></Link>
              <Link to= '/check-form'><li className="navigation__link">check-form</li></Link>
              <Link to= '/scores'><li className="navigation__link"> проверить task</li></Link>
              <Link to= '/reviews'><li className="navigation__link">Reviews</li></Link>
            </ul>
          </nav>
          <Link to= '/authentication'><button onClick={exitAccount}>выйти из аккаунта</button></Link>
          
      </div>
    </div>
  );
}

export default Header;

