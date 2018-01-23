import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import PasswordField from './common/user/PasswordField';
import userActions from '../../store/actions/userActions';

import config from '../config';
import init from '../initFormValidation';

class Signup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    submitInfo: PropTypes.object.isRequired,
    update_password: PropTypes.func.isRequired,
    busy: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    init();
    if (!this.props.user.id) {
      setTimeout(() => this.props.history.push('/'), 2000);
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if ($(this.form).form('is valid')) {
      this.props.update_password(this.props.submitInfo);
    }
  }

  componentDidUpdate() {
    if (!this.props.user.id) {
      setTimeout(() => this.props.history.push('/user/signin'), 2000);
    }
  }

  render() {
    const { user } = this.props;
    if (!user.id) {
      return (
        <div className="user-form-content">
          <h2 className={ `ui ${config.theme} image header` }>
            <img src="/static/images/logo.png" className="image" alt="" />
            <div className="content">
              更新密码
            </div>
          </h2>
          <div className={ 'ui left aligned icon message' }>
            <i className="notched circle loading icon"></i>
            <div className="content" style={ { textAlign: 'left' } }>
              <div className="header">
                当前状态未登入/已登出
              </div>
              <p>正在跳转至登入页面...</p>
            </div>
          </div>
          <div className="ui divider"></div>
          <div>
            <i className="pointing right grey icon"></i>
            <Link className='ui right floated' to='/user/signin'>立刻跳转至登入页面</Link>
          </div>
          <div>
            <i className="pointing right grey icon"></i>
            <Link className='ui right floated' to='/'>立刻返回主页</Link>
          </div>
        </div>);
    }
    return (
      <div className="user-form-content">
        <h2 className={ `ui ${config.theme} image header` }>
          <img src="/static/images/logo.png" className="image" alt="" style={ { borderRadius: '4px' } }/>
          <div className="content">
            更新密码
          </div>
        </h2>
        <form ref={ e => this.form = e } className={ `ui form ${this.props.busy ? 'loading' : ''}` } onSubmit={ this.onFormSubmit }>
          <div className="ui segment">
            <PasswordField name='old_password' placeholder="旧密码"/>
            <div className="ui divider"></div>
            <PasswordField name='new_password' placeholder="新密码"/>
            <PasswordField name='confirm_new_password' placeholder="确认新密码"/>
            <button className={ `ui ${config.theme} fluid submit button` } type="submit">更新密码</button>
          </div>
          <div className="ui error message">
          </div>
        </form>
        <div className="ui divider"></div>
        <div>
          <i className="pointing right grey icon"></i>
          <Link className='ui right floated' to='/'>返回主页</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.toJSON().user,
  submitInfo: state.user.toJSON().submitInfo,
  busy: state.asyncStatus.toJSON().USER_UPDATE_PASSWORD_BUSY,
});

const mapDispatchToProps = (dispatch) => {
  return {
    update_password: (info) => {
      dispatch(userActions.update_password(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

