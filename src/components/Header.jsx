import React from "react";
import { useSelector } from "react-redux";

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

function Header() {
  const { role } = useSelector(({ authentication }) => authentication);
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="logo header__logo">Самый лучший логотип</div>
        {role && (
          <nav className="header__navigation">
            <ul className="navigation">
              {PAGE[role].map((el, index) => (
                <li key={index} className="navigation__link">
                    <span className="navigation__icon navigation__icon_hovered">
                      <span className="icon icon_home"></span>
                    </span><br/>
                  {el}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Header;
