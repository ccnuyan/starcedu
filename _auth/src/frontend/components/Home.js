import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Footer from './common/Footer';
import FrontPanel from './common/FrontPanel';
import HomeMenu from './common/HomeMenu';

import WebApps from './includes/WebApps';
import DesktopApps from './includes/DesktopApps';
import Others from './includes/Others';
import config from '../config';


class Home extends Component {
  componentDidMount() {
    $('#main')
    .visibility({
      context: $('.home-route'),
      once: false,
      onTopVisible() {
        $('.home.menu').css({ background: 'transparent', paddingTop: '80px' });
      },
      onTopPassed() {
        $('.home.menu').css({ background: '', paddingTop: '0' }).addClass(config.theme);
      },
    });

    // $('.masthead')
    //   .visibility({
    //     context: $('.home-route'),
    //     once: false,
    //     onUpdate(calculations) {
    //       $('.masthead .dark_segment_content_overlay').css({ opacity: 0.6 + (calculations.percentagePassed * 0.4) });
    //       $('.masthead .ui.text.container').css({
    //         bottom: `${(-calculations.percentagePassed * 100)}px`,
    //         opacity: 1 - (calculations.percentagePassed * 5),
    //       });
    //     },
    //   });
    // $('.ui.rating').rating();
  }

  render() {
    return (
      <div className="home-route main-route-content">
        <div className="home-content">
          <FrontPanel />
          <div ref={ e => this.main = e } id="main" style={ { margin: '-300px 0 0 0', width: '100%', position: 'absolute' } }></div>
          <div className="home-panels">
            <WebApps/>
            {/* <Slogan1/> */}
            <DesktopApps />
            {/* <Slogan2/> */}
            <Others />
          </div>
          <Footer />
        </div>
        <HomeMenu />
      </div>
    );
  }
}

Home.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Home);
