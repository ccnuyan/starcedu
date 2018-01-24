import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';

import config from '../config';
import userActions from '../../store/actions/userActions';

class Tenant extends Component {
  static propTypes = {
    tenant: PropTypes.object.isRequired,
    busy: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    tenant_signout: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (!this.props.tenant.id && prevProps.tenant.id) {
      window.location.replace(prevProps.tenant.home_url);
    }
  }

  render() {
    const { user, tenant, busy } = this.props;
    if (!tenant.id) {
      return <div />;
    }
    return <div className={ `ui basic compact segment ${busy}` ? 'busy' : '' } style={ { padding: '10px 0' } }>
      {user.id ? <h4>
        Hi, {user.username}:
      </h4> : ''}
      <h4 className="ui header">
        这是来自应用 <a href={ tenant.home_url }>{tenant.title}</a> 的登入请求.
      </h4>
      <div className="ui content">
        {tenant.description}
      </div>
      <h4 className="ui header">
        若您不想使用您在{config.title}的账户登入此应用, 您可以
      </h4>
      <div>
        <div className="ui button" onTouchTap={ this.props.tenant_signout }>返回 {tenant.title}</div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    tenant_signout: () => {
      dispatch(userActions.tenant_signout());
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tenant));
