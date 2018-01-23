import { Router } from 'express';

import qqMiddleware from './qqMiddleware';
import oauthServices from '../../../services/oauthServices';

const router = Router();

router.get('/qq', qqMiddleware);

router.get('/:vender', async (req, res, next) => {
  /*
    req.oauth:{
      provider,
      unique_provider_id
    }
  */
  let oauthUser = await oauthServices.get_oauth_user_by_provider_info({
    unique_provider_id: req.oauth.unique_provider_id,
    provider: req.oauth.provider,
  });

  // 无oauth登录记录
  if (!oauthUser) {
    const ret = await oauthServices.add_oauth_user({
      unique_provider_id: req.oauth.unique_provider_id,
      provider: req.oauth.provider,
      profile: req.oauth.profile,
    });
    oauthUser = ret;
  }

  if (!oauthUser.user_id) {
    // oauth未绑定
    req.session.oauthUser = oauthUser;
    next();
  } else {
    // oauth登录过且已绑定
    req.session.oauthUser = {};
    const payload = ({
      unique_provider_id: req.oauth.unique_provider_id,
      provider: req.oauth.provider,
    });
    const loginInfo = await oauthServices.authenticate(payload);
    req.session.user = loginInfo;
    next();
  }
});

export default router;
