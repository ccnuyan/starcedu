
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

import serverConfig from '../../serverConfig';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${serverConfig.mode === 'test' ? '*' : serverConfig.domain}`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Cache-Control', 'no-cache');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

module.exports = allowCrossDomain;
