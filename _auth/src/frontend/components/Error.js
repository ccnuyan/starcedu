import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Link,
} from 'react-router-dom';
import config from '../config';

class Error extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/');
    }, 3000);
  }

  render = () => {
    return (
      <div className="main-route-content">
        <div className="not-found-content">
          <h2 className={ `ui ${config.theme} image header` }>
            <img src="/static/images/logo.png" className="image" alt="" />
            <div className="content">
              Error , 即将返回主页
            </div>
          </h2>
          <div className={ 'ui left aligned icon message' }>
            <i className="red bug icon"></i>
            <div className="content" style={ { textAlign: 'left' } }>
              <div className="header">
                程序出现了错误
              </div>
              <p>我们已经记录了该错误，以便我们改进以优化您的使用体验。</p>
            </div>
          </div>
          <div className="ui divider"></div>
          <div>
            <i className="pointing right grey icon"></i>
            <Link className='ui right floated' to='/'>立刻返回主页</Link>
          </div>
        </div>
      </div>);
  };
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Error));
