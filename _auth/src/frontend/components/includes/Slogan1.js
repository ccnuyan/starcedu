import React, { Component } from 'react';

class Slogan1 extends Component {
  componentDidMount() {
    $('.ui.progress').progress();
  }


  render() {
    return (
      <div className="ui  segment">
        <div className="ui text container">
          <h1 className="ui header">
            <i className="huge icon bell"></i>
            Total Progress
          </h1>
          <div data-percent='40' className="ui white progress">
            <div className="bar">
              <div className="progress">40%</div>
            </div>
          </div>

          <div data-percent='60' className="ui yellow progress">
            <div className="bar">
              <div className="progress"></div>
            </div>
            <div className="label">认证系统&服务</div>
          </div>
          <div data-percent='30' className="ui green progress">
            <div className="bar">
              <div className="progress"></div>
            </div>
            <div className="label">网盘系统&云存储服务</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slogan1;

