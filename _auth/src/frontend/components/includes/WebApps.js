import React, { Component } from 'react';

class WebApps extends Component {
  render() {
    return (
      <div className="ui info-panel basic segment">
        <div className="ui container">
          <h1 className="ui header">
            Web Apps
          </h1>
          <div className="ui compact basic vertical segment">
            <div className="ui big header">
                备课笔记
            </div>
            <div className="content">
            </div>
            <div className="extra content">
              <a className="ui button" href="/apps/notebook">Go</a>
            </div>
          </div>
          <div className="ui compact basic vertical segment">
            <div className="ui big header">
                网盘空间
              </div>
            <div className="content">
            </div>
            <div className="extra content">
              <button className="ui button" href="/apps/disk">Go</button>
            </div>
          </div>
          <div className="ui compact basic vertical segment">
            <div className="ui big header">
                脑图
              </div>
          </div>
        </div>
      </div>);
  }
}

export default WebApps;
