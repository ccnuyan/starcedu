import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userActions from '../../../../store/actions/userActions';

class PasswordField extends Component {

  onChange(event) {
    event.preventDefault();
    const payload = {};
    payload[this.props.name] = event.target.value;
    this.props.setSubmitInfo(payload);
  }

  render() {
    const { name, placeholder } = this.props;
    return (
      <div className="field">
        <div className="ui left icon input">
          <i className="lock icon"></i>
          <input onChange={ this.onChange } value={ this.props.submitInfo[this.props.name] || '' } type="password" { ... { name, placeholder } } />
        </div>
      </div>
    );
  }
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
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
    setSubmitInfo: (payload) => {
      userActions.setSubmitInfo(dispatch, payload);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordField);
