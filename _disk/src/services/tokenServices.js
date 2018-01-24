import jwt from 'jsonwebtoken';
import _ from 'lodash';
import serverConfig from '../../../serverConfig';

export const sign = (issuer, payload) => {
  const user = _.pick(payload, [' id', 'username', 'gender', 'nickname']);
  return jwt.sign(
    user,
    serverConfig.auth.jwt.secret,
    {
      expiresIn: serverConfig.auth.jwt.expiresIn,
      issuer,
    },
  );
};

export const verify = (token) => {
  return jwt.verify(token, serverConfig.auth.jwt.secret);
};

