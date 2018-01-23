import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Signout from './Signout';
import Password from './Password';
import Decide from './Decide';
import NotFound from './NotFound';

class Home extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }
  render = () => {
    const { location } = this.props;
    return (
      <div className="user-form main-route-content">
        <Switch>
          <Route location={ location } component={ Signin } path='/user/signin' exact={ true }></Route>
          <Route location={ location } component={ Signup } path='/user/signup' exact={ true }></Route>
          <Route location={ location } component={ Signout } path='/user/signout' exact={ true }></Route>
          <Route location={ location } component={ Decide } path='/user/decide' exact={ true }></Route>
          <Route location={ location } component={ Password } path='/user/password' exact={ true }></Route>
          <Route component={ NotFound } path='/*'></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(Home);
