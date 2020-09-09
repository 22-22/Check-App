import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading  from "../Loading/Loading";
import UserList from "../../components/UserList/UserList";

import checkAuth from "../../utils/checkAuth";
function Authentication({ history }) {
  const [gitHubId, setGitHubId] = React.useState("");
  
  const [submitFlag, setSubmitFlag] = React.useState(null);

  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);

  
  React.useEffect(() => {
    checkAuth(history, authentication, dispatch, "/home");
  }, [authentication, submitFlag]);

  const changeInput = (event) => {
    setGitHubId(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    localStorage.setItem("gitHubUser", gitHubId);
    setSubmitFlag(true);
  };

  return !authentication && (
    <div className="authentication">
      <div className="wrapper authentication__wrapper">
          <h1 className="authentication__title">
            X Check App / RS Assessment Tool
          </h1>
          <span className="authentication__subtitle">Group 34</span><br/>
          Нужно ввести просто "user"!!!!!!! если запорите , то просто очистите переменную localStorage !!!!!
          <form className="authentication__form" onSubmit={submitForm}>
            <input
              placeholder="Ваш GitHub"
              value={gitHubId}
              onChange={changeInput}
            />
            <br />
            <button className="button button_bordered">Войти</button>
          </form>
          <div className="authentication__content">
            {/* <UserList category="student" setGitHubId={setGitHubId} gitHubId ={gitHubId}/>
            <UserList category="supervisor" setGitHubId={setGitHubId} gitHubId ={gitHubId}/> */}
          </div>
        </div>
    </div>
  );
}

export default Authentication;
