import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Navigator from './components/navigator/Navigator';
import UserProfile from './components/user-profile/UserProfile';
import Register from './components/register/Register';

const ProtectedRoute = (props: any): JSX.Element => {
  const loggedIn = localStorage.getItem('token') ? true : false;
  const Component = props.component;
  return (
    <Route render={(props) => (
      <React.Fragment>
        { loggedIn ?
          (<Navigator>
            <Component {...props} />
          </Navigator>)
          : (<Redirect to={{ pathname: "/" }} />)}
      </React.Fragment>
    )}>
    </Route>
  )
}

const RouterOutlet = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <ProtectedRoute exact path='/home' component={UserProfile} />
      </Switch>
    </Router>
  );
}

export default RouterOutlet;
