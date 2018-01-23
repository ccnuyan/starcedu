import React, { Component } from 'react';

import config from '../../config';

class DesktopApps extends Component {
  render() {
    return (
      <div className="ui info-panel basic segment">
        <div className="dark_segment_content">
          <div className="dark_segment_content_overlay"></div>
        </div>
        <div className="ui container">
          <h1 className="ui inverted header">
            桌面 Apps
          </h1>
          <div className="ui two compact cards">
            <div className="ui pink card">
              <div className="content">
                <div className="ui star rating" data-rating="3"></div>
              </div>
              <div className="content">
                <div className="header">教师端</div>
              </div>
              <div className="content">
                <div className="ui mini statistic">
                  <div className="value">
                    <i className="download icon"></i> 5,550
                  </div>
                  <div className="label">
                    Downloads
                  </div>
                </div>
              </div>
              <div className="content">
                <h4 className="ui sub header">Activity</h4>
                <div className="ui small feed">
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Helen Troy</a> added two pictures
                </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="extra content">
                <button className="ui button">Download</button>
              </div>
            </div>
            <div className={ `ui ${config.theme} card` }>
              <div className="content">
                <div className="header">学生端</div>
              </div>
              <div className="content">
                <h4 className="ui sub header">Activity</h4>
                <div className="ui small feed">
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a>Helen Troy</a> added two pictures
                </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="extra content">
                <button className="ui button">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopApps;
