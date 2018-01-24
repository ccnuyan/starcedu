import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Busy extends Component {
  render() {
    if (this.props.isBusy) {
      return (<div className={ 'ui left aligned icon message' }>
        <i className="notched circle loading icon"></i>
        <div className="content" style={ { textAlign: 'left' } }>
          <div className="header">
            {this.props.header}
          </div>
          <p>
            {this.props.content}
          </p>
        </div>
      </div>);
    }

    return (<div className={ 'ui left aligned icon message' }>
      <i className="green check icon"></i>
      <div className="content" style={ { textAlign: 'left' } }>
        <div className="header">
          {this.props.header}
        </div>
        <p>
          {this.props.content}
        </p>
      </div>
    </div>);
  }
}

Busy.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Busy;
