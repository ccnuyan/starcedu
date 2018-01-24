import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import userActions from '../../store/actions/userActions';
import config from '../config';
import Busy from './Busy';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    const { busy, user } = this.props;
    if (!user.id) {
      return (<Redirect to={ { pathname: '/callback_redirect' } }/>);
    }
    return (
      <div className="user-form-content">
        <h2 className={ `ui ${config.theme} image header` }>
          <img src="/static/images/logo.png" className="image" alt="" />
          <div className="content">
          登出
        </div>
        </h2>
        <Busy isBusy={ true } header={ busy ? '正在登出' : '正在登出' } content={ busy ? '登出后将自动跳转' : '登出后将自动跳转' }/>
      </div>);
  }
}

Signout.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  busy: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.toJSON().user,
  busy: state.asyncStatus.toJSON().USER_SIGNOUT_BUSY,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => {
      dispatch(userActions.signout());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signout));
