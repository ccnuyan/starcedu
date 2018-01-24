import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userActions from '../../../../store/actions/userActions';

class EmailField extends Component {

  onChange(event) {
    event.preventDefault();
    this.props.setSubmitInfo(event.target.value.toLowerCase());
  }

  render() {
    return (
      <div className="field">
        <div className="ui left icon email input">
          <i className="user icon"></i>
          <input
            onChange={ this.onChange } type="text" name="email" placeholder="邮箱"
            value={ this.props.submitInfo.username || '' }
          />
        </div>
      </div>
    );
  }
}

EmailField.propTypes = {
  user: PropTypes.object.isRequired,
  submitInfo: PropTypes.object.isRequired,
  setSubmitInfo: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  user: state.user.toJSON().user,
  submitInfo: state.user.toJSON().submitInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSubmitInfo: (username) => {
      userActions.setSubmitInfo(dispatch, {
        username,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailField);
