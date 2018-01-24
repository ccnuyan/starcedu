import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import config from '../config';
import userActions from '../../store/actions/userActions';

class Decide extends Component {
  componentDidMount() {
    const { user, tenant } = this.props;
    if (!tenant.id) {
      this.props.history.push('/');
    }
    if (!user.id) {
      this.props.history.push({
        pathname: '/user/signin',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.tenant.id && prevProps.tenant.id) {
      if (this.state.target === '/') {
        this.props.history.push(this.state.target);
      } else {
        window.location.replace(this.state.target);
      }
    }
  }

  tenantSignout(event) {
    this.setState({ target: event.target.dataset.target });
    this.props.tenant_signout();
  }


  render() {
    const { user, tenant } = this.props;
    if (!user.id) {
      return <div />;
    }
    return (
      <div className="user-form-content">
        <h2 className={ `ui ${config.theme} image header` }>
          <img src="/static/images/logo.png" className="image" alt="" style={ { borderRadius: '4px' } } />
          <div className="content">
            {'授权'}
          </div>
        </h2>
        <div className={ `ui basic segment ${!this.props.tenant.id ? 'loading' : ''}` } style={ { padding: '10px 0' } }>
          <h4>
            Hi, {user.username}:
          </h4>
          <h4 className="ui header">
            这是来自应用 <a href={ tenant.home_url }>{tenant.title}</a> 的登入请求.
           </h4>
          <div className="ui content">
            {tenant.description}
          </div>
          <div className="ui divider"></div>
          <form className="ui form three buttons" method="post" action="/user/decide">
            <Link className={ 'ui gray fluid button' } to={ {
              pathname: '/user/signout',
            } }
            >切换用户</Link>
            <input className={ 'ui blue fluid submit button' } type="submit" value="确定" />
          </form>
          <div className="ui divider"></div>
          <div>
            <i className="pointing right grey icon"></i>
            <a onTouchTap={ this.tenantSignout } data-target={ '/' } >取消并返回 {config.title}</a>
          </div>
          <div>
            <i className="pointing right grey icon"></i>
            <a onTouchTap={ this.tenantSignout } data-target={ tenant.home_url } >取消并前往 {tenant.title}</a>
          </div>
        </div>
      </div>);
  }
}

Decide.propTypes = {
  user: PropTypes.object.isRequired,
  tenant: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  busy: PropTypes.bool.isRequired,
  tenant_signout: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  return {
    user: state.user.toJSON().user,
    tenant: state.user.toJSON().tenant,
    busy: state.asyncStatus.toJSON().USER_TENANT_SIGNOUT_BUSY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tenant_signout: () => {
      dispatch(userActions.tenant_signout());
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Decide));
