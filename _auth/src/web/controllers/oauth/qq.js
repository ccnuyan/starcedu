import { Router } from 'express';
import uuid from 'uuid';
import querystring from 'querystring';

import config from '../../../../config';

const router = Router();

router.get('/', (req, res) => {
  const state = uuid.v4();

  const query = {
    response_type: 'code',
    scope: 'get_user_info',
    client_id: config.oauth.qq.app_id,
    redirect_uri: config.oauth.qq.redirect_uri,
    state,
  };
  const location = `${config.oauth.qq.pcCodeHost}?${querystring.stringify(query)}`;
  res.redirect(location);
});

export default router;
