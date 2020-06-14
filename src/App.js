import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UserService from './services/UserService.js';
import Login from './views/Login.jsx';
import Registration from './views/Registration.jsx';
import Dashboard from './views/Dashboard.jsx';
import UsersPage from './views/UsersPage.jsx';
import UserEdit from './components/UserEdit.jsx';
import UserInspect from './components/UserInspect.jsx';
import TaskService from './services/TaskService.js';
import TaskEdit from './components/TaskEdit.jsx';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      UserService.getCurrentUser().isAdmin ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

export default class App extends React.Component {
  componentDidMount() {
    UserService.addSeedAdmin();
    TaskService.addSeedTask();
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <PrivateRoute component={UserEdit} path="/users-edit/:id" exact />
            <PrivateRoute component={UserEdit} path="/users-edit" exact />
            <PrivateRoute component={UserInspect} path="/users/:id" exact />
            <PrivateRoute component={UsersPage} path="/users" exact />
            <PrivateRoute component={TaskEdit} path="/tasks-edit/:id" exact />
            <PrivateRoute component={TaskEdit} path="/tasks-edit" exact />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}
