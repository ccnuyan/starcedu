import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import {
  Link,
} from 'react-router-dom';
import {
  Redirect,
} from 'react-router';

import EmailField from './common/user/EmailField';
import config from '../config';
import PasswordField from './common/user/PasswordField';
import OAuthProviders from './common/user/OAuthProviders';
import userActions from '../../store/actions/userActions';
import QQInfo from './common/user/oauth/QQInfo';
import Busy from './Busy';

import init from '../initFormValidation';

class Signin extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    oauthUser: PropTypes.object.isRequired,
    submitInfo: PropTypes.object.isRequired,
    busy: PropTypes.bool.isRequired,
    signin: PropTypes.func.isRequired,
    setAutoSignin: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    tenant: PropTypes.object.isRequired,
  }

  componentDidMount() {
    init();
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if ($(this.form).form('is valid')) {
      this.props.signin(this.props.submitInfo);
    }
  }

  onAutoSiginChange = (event) => {
    this.props.setAutoSignin(event.target.checked);
  }

  render() {
    const { user, submitInfo, oauthUser, busy } = this.props;
    if (user.id) {
      return <Redirect to={ { pathname: '/callback_redirect' } }/>;
    }
    return (
      <div className="user-form-content">
        <h2 className={ `ui ${config.theme} image header` }>
          <img src="/static/images/logo.png" className="image" alt="" style={ { borderRadius: '4px' } } />
          <div className="content">
            {'登入'}
          </div>
        </h2>
        {/* oauthe user */}
        {oauthUser.id && !busy ? <div className="ui divider"></div> : ''}
        {oauthUser.id && !busy ? <QQInfo /> : ''}

        <form ref={ e => this.form = e } className={ `ui form ${this.props.busy ? 'loading' : ''}` } onSubmit={ this.onFormSubmit }>
          <div className="ui segment">
            <EmailField />
            <PasswordField name='password' placeholder="密码" />
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" id="auto_signin_checkbox" checked={ submitInfo.autoSignin } onChange={ this.onAutoSiginChange } />
                <label id="auto_signin_checkbox_label" htmlFor="auto_signin_checkbox">两周内自动登入</label>
              </div>
            </div>
            <button className={ `ui ${config.theme} fluid submit button` } type="submit" >登入</button>
          </div>
          <div className="ui error message">
          </div>
        </form>

        {/* 3rd party authentication providers */}
        {!busy ? <OAuthProviders /> : ''}

        {/* links */}
        {!busy ?
          <div>
            <div className="ui divider"></div>
            <div>
              <i className="pointing right grey icon"></i>
              尚未注册？
              <Link to='/user/signup' >去注册!</Link>
            </div>
            <div>
              <i className="pointing right grey icon"></i>
              忘记密码？
              <span to='/user/signup' >去找回!(未实现)</span>
            </div>
          </div> : ''}
      </div>);
  }
}

const mapStateToProps = state => ({
  user: state.user.toJSON().user,
  tenant: state.user.toJSON().tenant,
  oauthUser: state.user.toJSON().oauthUser,
  submitInfo: state.user.toJSON().submitInfo,
  busy: state.asyncStatus.toJSON().USER_SIGNIN_BUSY,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (info) => {
      dispatch(userActions.signin(info));
    },
    setAutoSignin: (value) => {
      userActions.setAutoSignin(dispatch, value);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
