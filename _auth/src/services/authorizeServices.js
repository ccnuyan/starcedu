import jsonwebtoken from 'jsonwebtoken';

import serverConfig from '../../../serverConfig';
import tenants from '../../../serverConfig/tenants';
import pgPool from '../../../db/connector';
import { sign } from './tokenServices';

const generateCode = async ({ tenant, state, user_id }) => {
  return pgPool.query(`insert into ${serverConfig.auth_dbname}.authorization_codes (tenant, state,  user_id) values ($1, $2, $3) returning *`, [tenant, state, user_id]) // eslint-disable-line max-len
    .then((res) => {
      if (res.rowCount === 1) {
        return { success: true, ...res.rows[0] };
      }
      return { success: false };
    });
};

const exchange_code_for_token = async ({ code, token }) => {
  const codeStruct = await pgPool.query(`select * from ${serverConfig.auth_dbname}.authorization_codes where code=$1`, [code]).then((res) => {
    if (res.rowCount === 1) {
      return { success: true, ...res.rows[0] };
    }
    return { success: false };
  });
  if (!codeStruct.success) { return { success: false }; }

  const decodedcode = jsonwebtoken.verify(token, tenants[codeStruct.tenant].key);
  if (decodedcode !== code) { return { success: false }; }

  const user = await pgPool.query(`select * from ${serverConfig.auth_dbname}.users where id=$1`, [codeStruct.user_id]).then(res => res.rows[0]);

  user.token = sign('local', { to: codeStruct.tenant, ...user });

  await pgPool.query(`select * from ${serverConfig.auth_dbname}.add_login($1, $2, $3, $4)`, [user.id, 'token', user.token, 'token']);
  await pgPool.query(`delete from ${serverConfig.auth_dbname}.authorization_codes where code=$1`, [code]);

  return {
    success: true,
    ...user,
  };
};


export default {
  generateCode,
  exchange_code_for_token,
};
