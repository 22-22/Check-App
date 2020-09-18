import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../pages";

import checkAuth from "../utils/checkAuth";
function Authentication({ history }) {
  const [statePage, setStatePage] = React.useState(null);
  const [gitHubId, setGitHubId] = React.useState("");
  
  const [submitFlag, setSubmitFlag] = React.useState(null);

  const dispatch = useDispatch();
  const { authentication } = useSelector(({ authentication }) => authentication);

  React.useEffect(() => {
    checkAuth(history, authentication, dispatch, "/account");
  },  );

  const changeInput = (event) => {
    setGitHubId(event.target.value);
    console.log(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    localStorage.setItem("gitHubUser", gitHubId);
    setSubmitFlag(true)
  };

  return (
    authentication ? <Loading />
    : <div className="authentication">
      <div className="wrapper">
        <div className="authentication__content">
          <h1 className="authentication__title">
            X Check App / RS Assessment Tool
          </h1>
          <span className="authentication__subtitle">Group 34</span>
          {statePage ? (
            <form className="authentication__form" onSubmit={submitForm}>
              <input
                placeholder="Ваш GitHub"
                value={gitHubId}
                onChange={changeInput}
              />
              <br />
              <button
                className="button button_bordered"
                onClick={() => setStatePage(null)}
              >
                Назад
              </button>
              <button className="button button_bordered">
                {statePage === "signIn" && "Войти"}
                {statePage === "signUp" && "Добавить"}
              </button>
            </form>
          ) : (
            <div className="authentication__buttons">
              <button
                className="button button_bordered"
                onClick={() => setStatePage("signUp")}
              >
                Добавить нового пользователя
              </button>
              <button
                className="button button_bordered"
                onClick={() => setStatePage("signIn")}
              >
                Уже зарегистрирован
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
