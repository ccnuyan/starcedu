import userServices from '../../services/userServices';
import paramsValidator from '../paramsValidator';

const update_password = async (req, res) => {
  const payload = {
    old_password: req.body.old_password,
    new_password: req.body.new_password,
  };

  payload.username = req.user.username;

  const valRet = paramsValidator.validate(payload, ['old_password', 'new_password']);
  if (!valRet.status) {
    return res.status(400).json(valRet);
  }

  const ret = await userServices.update_password(payload);

  if (ret.success) {
    if (req.session) {
      req.session.user = {};
    }
    res.status(200).json({
      data: ret,
      message: ret.message,
    });
  } else {
    res.status(400).json({
      message: ret.message,
    });
  }
};

export default update_password;
