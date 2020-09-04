import React from "react";
import { useSelector } from 'react-redux';
import { Route, withRouter, Switch} from "react-router-dom";

import { Header } from "./components";
import { Authentication, UserAccount } from "./pages";

function App() {
  const  { authentication } = useSelector(({authentication})=>(authentication));
  return (
    <div className="app">
      {authentication && <Header />}
      <div className={`app__content ${ authentication ? 'app__content_change': ''}`}>
      <Switch>
        <Route path="/authentication" component={ Authentication } exact />
        <Route path="/account" component={ UserAccount } exact />
      </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);

  // хорошо ли использовать здесь useSelector???
  // создать компонент кнопки
  // переписать стили mexin-ами
  //  стоил ли плитками делать меню стартовое
  // доделать регистрацию и авторизацию
  // дописать базовые запросы
  