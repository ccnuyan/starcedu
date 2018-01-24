import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import config from '../config';

class CallbackRedirect extends Component {
  render() {
    const { user, tenant, oauthUser, callback } = this.props;

    if (tenant && tenant.id) {
      return <Redirect to={ '/user/decide' }/>;
    }

    if (oauthUser && oauthUser.id) {
      return <Redirect to={ '/user/signin' }/>;
    }

    if (user && user.id) {
      if (callback) {
        if (callback.startsWith('/') && !callback.startsWith('/apps')) {
          return <Redirect to={ callback }/>;
        }
        if (callback.startsWith('/apps/')) {
          return window.location.replace(`http://${config.domain}${callback}`);
        }
        return window.location.replace(callback);
      }
    }

    return <Redirect to={ '/' }/>;
  }
}

CallbackRedirect.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  tenant: PropTypes.object.isRequired,
  oauthUser: PropTypes.object.isRequired,
  callback: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.user.toJSON().user,
  tenant: state.user.toJSON().tenant,
  oauthUser: state.user.toJSON().oauthUser,
  callback: state.user.toJSON().callback,
});

export default withRouter(connect(mapStateToProps)(CallbackRedirect));
