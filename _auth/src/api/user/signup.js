import _ from 'lodash';
import userServices from '../../services/userServices';
import paramsValidator from '../paramsValidator';

const signup = async (req, res) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
  };

  const valRet = paramsValidator.validate(payload, ['username', 'password']);
  if (!valRet.status) {
    return res.status(400).json(valRet);
  }

  if (req.oauthUser && req.oauthUser.id) {
    payload.oauth_user_id = req.oauthUser.id;
  }

  const ret = await userServices.register(payload, req.authConfig);
  const pickedUser = _.pick(ret, ['username', 'id', 'token']);

  if (ret.success) {
    if (req.session) {
      req.session.oauthUser = {};
      req.session.user = ret;
    }
    res.json({
      data: pickedUser,
      message: ret.message,
    });
  } else {
    if (req.session) {
      req.session.oauthUser = {};
      req.session.user = {};
    }
    res.status(400).json({
      message: ret.message,
    });
  }
};

export default signup;
