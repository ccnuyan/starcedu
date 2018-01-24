import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Message extends Component {

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (message.id !== prevProps.message.id) {
      if (message.header) {
        $(this.messenger)
          .transition({ animation: 'fade in', duration: '500ms' })
          .transition({ interval: 2000, animation: 'fade out', duration: '500ms' });
      }
    }
  }

  getStyle() {
    return {
      position: 'fixed',
      top: '40px',
      width: '360px',
      left: '50%',
      marginLeft: '-180px',
    };
  }

  getDetail() {
    const { message } = this.props;
    if (message.details) {
      if (typeof (message.details) === 'string') {
        return (<div className="content">{message.details}</div>);
      }
      if (typeof (message.details) === 'object') {
        return (<div className="ui list">
          {message.details.map(msg => <div key={ Math.random() } className="ui item">{msg}</div>)}
        </div>);
      }
    }
    return '';
  }


  render() {
    const { message } = this.props;
    return (
      <div ref={ e => this.messenger = e } className="ui column" style={ this.getStyle() }>
        <div className={ `ui center aligned message ${message.header ? '' : 'hidden'} ${message.status}` }>
          <div className="header">
            {message.header}
          </div>
          {this.getDetail()}
        </div>
      </ div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  message: state.asyncStatus.get('HEADER_MESSAGE').toJSON(),
});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
