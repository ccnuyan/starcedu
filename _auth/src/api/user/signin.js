import serverConfig from '../../../../serverConfig';
import userServices from '../../services/userServices';
import paramsValidator from '../paramsValidator';

const signin = async (req, res) => {
  const payload = {
    autoSignin: req.body.autoSignin,
    username: req.body.username,
    password: req.body.password,
  };

  const valRet = paramsValidator.validate(payload, ['username', 'password']);
  if (!valRet.status) {
    return res.status(400).json(valRet);
  }

  if (req.oauthUser && req.oauthUser.id) {
    payload.oauth_user_id = req.session.oauthUser.id;
  }

  const ret = await userServices.authenticate(payload, req.authConfig);
  const pickedUser = _.pick(ret, ['username', 'id', 'token']);

  if (ret.success) {
    if (req.session) {
      req.session.user = pickedUser;
      if (payload.autoSignin === true) {
        req.session.cookie.maxAge = serverConfig.cookie.maxAge;
      } else {
        req.session.cookie.expires = false;
      }
      // if there is a tenant, save the callback for the case callback from 3rd party provider.
      req.session.callback = '/';
    }
    res.json({
      data: {
        ...pickedUser,
        // if there is a tenant, to decide is the first priority.
        callback: req.callback,
      },
      message: ret.message,
    });
  } else {
    if (req.session) {
      req.session.user = {};
    }
    res.status(400).json({
      message: ret.message,
    });
  }
};

export default signin;
