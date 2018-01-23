import querystring from 'querystring';

import authorizeServices from '../../../services/authorizeServices';

const authorize = async (req, res, next) => {
  if (req.query.tenant && req.query.state) {
    const cl = req.query.tenant;
    if (tenants[cl]) {
      const tenant = _.pick(tenants[cl], ['id', 'title', 'description', 'redirect_url', 'home_url']);
      req.session.tenant = {
        state: req.query.state,
        ...tenant,
      };
    }
  }
  next();
};

const decide = async (req, res, next) => {
  if (!req.session.tenant) {
    return res.redirect('/error');
  }
  const payload = {
    tenant: req.tenant.id,
    state: req.tenant.state,
    user_id: req.user.id,
  };
  req.session.tenant = {};

  const codeStruct = await authorizeServices.generateCode(payload);
  if (codeStruct.success) {
    const tenant = tenants[codeStruct.tenant];
    const query = querystring.stringify({
      code: codeStruct.code,
      state: codeStruct.state,
    });
    return res.redirect(`${tenant.redirect_url}?${query}`);
  }
  next();
};

const get_token = async (req, res) => {
  let tokenStruct = await authorizeServices.exchange_code_for_token({ code: req.body.code, token: req.body.token });
  if (tokenStruct.success) {
    tokenStruct = _.pick(tokenStruct, ['id', 'username', 'token']);
    return res.send({
      ...tokenStruct,
    });
  }
  return res.send({
    ...tokenStruct,
    message: 'get token error',
  });
};

export default {
  authorize,
  decide,
  get_token,
};
