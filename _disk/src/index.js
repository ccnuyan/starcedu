import api from './api/';
import web from './web/';

import session from '../../utils/middlewares/sessionMiddleware';
import userAUth from '../../utils/middlewares/byPassUserAuth';

const session2Req = (req, res, next) => {
  Object.keys(req.session).forEach((k) => {
    if (k !== 'cookie') req[k] = req.session[k];
  });
  next();
};

export default {
  api: (app) => {
    app.use('/api/local/*',
      session,
      session2Req);

    app.use('/api/tenant/*',
      userAUth);

    api(app);

    app.use('/api/status', (req, res) => {
      res.status(200).send({
        message: 'service ok',
      });
    });
    app.use('/api/*', (req, res) => {
      res.status(404).send({
        message: 'no such business',
      });
    });
  },
  web: (app) => {
    app.use('/*', session, session2Req);
    web(app);
  },
};

