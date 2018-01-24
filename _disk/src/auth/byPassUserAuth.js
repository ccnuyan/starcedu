/*
  this middleware won't interupt the anonymous accessing
*/
import chalk from 'chalk';
import { verify } from '../../src/services/tokenServices';
import serverConfig from '../../../serverConfig';

export default async (req, res, next) => {
  // no authorization token: bypass
  if (!req.headers[serverConfig.userHeader]) { return next(); }
  // authorization not in right format: bypass
  const breaks = req.headers[serverConfig.userHeader].split(' ');
  if (breaks.length !== 2) { return next(); }
  if (breaks[1] === 'null' || breaks[1] === 'undefined') { return next(); }

  try {
    // user token authentication
    if (breaks[0] === 'bearer') {
      const decoded = verify(breaks[1]);
      req.user = decoded;
    }
  } catch (err) {
    console.log(chalk.red(err)); // eslint-disable-line 
  } finally {
    next();
  }
};
