import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userActions from '../../../../../store/actions/userActions';

class QQInfo extends Component {
  render() {
    const { oauthUser } = this.props;
    return (
      <div className={ `ui segment ${this.props.busy ? 'loading' : ''}` }>
        <button className="right floated ui tiny button" onClick={ this.props.oauth_signout }>注销</button>
        <div className="content">
          <img className="left floated ui image" alt=""
              style={ { marginTop: '0px' } }
              src={ oauthUser.profile.figureurl_qq_1 }
          />
          <div className="header">
            {oauthUser.profile.nickname}
          </div>
            来自：腾讯QQ
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  oauthUser: state.user.toJSON().oauthUser,
  busy: state.asyncStatus.toJSON().USER_OAUTH_SIGNOUT_BUSY,
});

const mapDispatchToProps = (dispatch) => {
  return {
    oauth_signout: () => {
      dispatch(userActions.oauth_signout());
    },
  };
};

QQInfo.propTypes = {
  oauthUser: PropTypes.object.isRequired,
  oauth_signout: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QQInfo);
