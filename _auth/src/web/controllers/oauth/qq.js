import { Router } from 'express';
import uuid from 'uuid';
import querystring from 'querystring';

import serverConfig from '../../../../../serverConfig';

const router = Router();

router.get('/', (req, res) => {
  const state = uuid.v4();

  const query = {
    response_type: 'code',
    scope: 'get_user_info',
    client_id: serverConfig.oauth.qq.app_id,
    redirect_uri: serverConfig.oauth.qq.redirect_uri,
    state,
  };
  const location = `${serverConfig.oauth.qq.pcCodeHost}?${querystring.stringify(query)}`;
  res.redirect(location);
});

export default router;
