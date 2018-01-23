/*
  this middleware won't interupt the anonymous accessing
*/
import { verify } from '../../src/services/tokenServices';
import pgPool from '../../database/connector';

export default async (req, res, next) => {
  // no authorization token: bypass
  if (!req.headers[serverConfig.auth.userHeader]) { return next(); }
  // authorization not in right format: bypass
  const breaks = req.headers[serverConfig.auth.userHeader].split(' ');
  if (breaks.length !== 2) { return next(); }
  if (breaks[1] === 'null' || breaks[1] === 'undefined') { return next(); }

  try {
    // user token authentication
    if (breaks[0] === 'bearer') {
      const decoded = verify(breaks[1]);
      const pres = await pgPool
        .query(`select * from ${serverConfig.dbname}.authenticate($1, $2, $3)`, ['token', breaks[1], 'token'])
        .then(ret => ret.rows[0]);

      if (pres.success) {
        req.user = decoded;
      }
    }
  } catch (err) {
    global.printError(err, __filename);
  } finally {
    next();
  }
};
