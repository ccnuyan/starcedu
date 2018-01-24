import querystring from 'querystring';
import serverConfig from '../../../../../serverConfig';
import goGet from './goGet';

const qqMiddleware = (req, res, next) => {
  // ref http://wiki.connect.qq.com/oauth2-0%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3
  const { state, code } = req.query;

  // TODO verify state
  const query = {
    grant_type: 'authorization_code',
    state,
    code,
    client_id: serverConfig.oauth.qq.app_id,
    client_secret: serverConfig.oauth.qq.app_key,
    redirect_uri: serverConfig.oauth.qq.redirect_uri,
  };

  // go get the token
  goGet(serverConfig.oauth.qq.pcTokenHost, query, (err1, rs1, bd1) => {
    if (err1) {
      return next(err1);
    }

    const { access_token, expires_in, refresh_token } = querystring.parse(bd1); // eslint-disable-line

    // go get the openid
    goGet(serverConfig.oauth.qq.pcOpenidHost, { access_token }, (err2, rs2, bd2) => {
      if (err2) {
        return next(err2);
      }
      const bodyObject = JSON.parse(bd2.match(/{.+}/)[0]);
      const openid = bodyObject.openid;

      req.oauth = {
        provider: 'qq',
        qq: {
          openid,
          access_token,
        },
      };

      // go get the user info
      goGet(serverConfig.oauth.qq.infoHost, {
        openid,
        oauth_consumer_key: serverConfig.oauth.qq.app_id,
        access_token,
      }, (err3, rs3, bd3) => { // eslint-disable-line
        if (err3) {
          return next(err3);
        }

        /*
          { ret: 0,
          msg: '',
          is_lost: 0,
          nickname: '严程序',
          gender: '男',
          province: '湖北',
          city: '武汉',
          year: '1983',
          figureurl: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/30',
          figureurl_1: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/50',
          figureurl_2: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/100',
          figureurl_qq_1: 'http://q.qlogo.cn/qqapp/101271080/DC2161A5A64497EDC71552DF6850E092/40',
          figureurl_qq_2: 'http://q.qlogo.cn/qqapp/101271080/DC2161A5A64497EDC71552DF6850E092/100',
          is_yellow_vip: '0',
          vip: '0',
          yellow_vip_level: '0',
          level: '0',
          is_yellow_year_vip: '0' }
        */

        req.oauth = {
          provider: 'qq',
          unique_provider_id: openid,
          profile: bd3,
        };

        next('route');
      });
    });
  });
};

export default qqMiddleware;
