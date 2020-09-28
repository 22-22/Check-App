import React from "react";
import { useSelector } from 'react-redux';
import { Route, withRouter, Switch } from "react-router-dom";

import  Header  from "./components/Header/Header";
// import Loading from './pages/Loading/Loading';
import Authentication from "./pages/Authentication/Authentication";
import HomePage from './pages/HomePage/HomePage';
import CreateTask from './pages/CreateTask/CreateTask';
import ReviewRequest from './pages/ReviewRequest/ReviewRequest';
import ReviewRequests from "./pages/ReviewRequests/ReviewRequests";
import Tasks from './pages/Tasks/Tasks';
import CheckForm from './pages/CheckForm/CheckForm';
import Reviews from './pages/Reviews/Reviews';
import TaskView from "./pages/TaskView/TaskView";
import DraftsPage from "./pages/DraftsPage/DraftsPage";
// import UserAccount from './pages/UserAccount/UserAccount';
// import Account from './pages/Account/Account';

import 'antd/dist/antd.css';
function App() {
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  return (
    <div className="app">
      {authentication && <Header />}
      <div className="wrapper">
        <Switch>
          <Route path="/" component={ HomePage } exact />
          <Route path="/authentication" component={ Authentication } exact />
          <Route path="/create-task" component={ CreateTask } exact />
          <Route path="/create-task/:id" component={ CreateTask } exact />
          <Route path="/review-request" component={ ReviewRequest } exact />
          <Route path="/review-request/:id" component={ ReviewRequest } exact />
          <Route path="/review-requests" component={ ReviewRequests } exact />
          <Route path="/tasks" component={ Tasks } exact />
          <Route path="/tasks/:id" component={ TaskView } exact />
          <Route path="/check-form/:id?/:status?" component={ CheckForm } exact />
          <Route path="/reviews" component={ Reviews } exact />
          <Route path="/drafts" component={ DraftsPage } exact />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
