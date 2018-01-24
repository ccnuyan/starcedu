import jwt from 'jsonwebtoken';
import _ from 'lodash';
import serverConfig from '../../../serverConfig';

export const sign = (issuer, payload) => {
  const user = _.pick(payload, [' id', 'username', 'gender', 'nickname']);
  return jwt.sign(
    user,
    serverConfig.jwt.secret,
    {
      expiresIn: serverConfig.jwt.expiresIn,
      issuer,
    },
  );
};

export const verify = (token) => {
  return jwt.verify(token, serverConfig.jwt.secret);
};

