import { sign } from '../../../utils/middlewares/tokenServices';
import serverConfig from '../../../serverConfig';
import pgPool from '../../../db/connector';

const authenticate = async ({ unique_provider_id, provider, client }) => {
  let user = {};
  user = await pgPool.query(`select * from ${serverConfig.auth_dbname}.oauth_authenticate($1, $2)`, [unique_provider_id, provider]) // eslint-disable-line max-len
    .then((res) => {
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return { success: false };
    });

  if (user.id) {
    const token = sign('local', {
      to: client || 'local',
      user,
    });
    user.token = token;// 添加login
    await pgPool.query(`select * from ${serverConfig.auth_dbname}.add_login($1, $2, $3, $4)`, [user.id, unique_provider_id, token, provider]); // eslint-disable-line max-len
    return user;
  }
  return { success: false };
};


const get_associated_oauth_users = ({ user_id }) => {
  return pgPool.query(`select * from ${serverConfig.auth_dbname}.oauth2users where user_id = $1`, [user_id])
    .then((res) => {
      return res.rows;
    });
};

const get_oauth_user_by_provider_info = ({ unique_provider_id, provider }) => {
  return pgPool.query(`select * from ${serverConfig.auth_dbname}.oauth2users where unique_provider_id = $1 and provider = $2`, [unique_provider_id, provider])
    .then((res) => {
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return false;
    });
};

const add_oauth_user = ({ provider, unique_provider_id, profile }) => {
  return pgPool.query(`insert into ${serverConfig.auth_dbname}.oauth2users(unique_provider_id, provider, profile) values ($1,$2,$3) returning *`, [unique_provider_id, provider, profile]) // eslint-disable-line max-len
    .then((res) => {
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return { success: false };
    });
};

const get_oauth_user = ({ oauth_user_id }) => {
  return pgPool.query(`select * from ${serverConfig.auth_dbname}.oauth2users where id = $1`, [oauth_user_id])
    .then((res) => {
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return { success: false };
    });
};

const unlink_oauth_user = ({ oauth_user_id, bind_user_id }) => {
  return pgPool.query(`select * from ${serverConfig.auth_dbname}.unlink_oauth_user($1, $2)`, [oauth_user_id, bind_user_id])
    .then((res) => {
      return res.rows;
    });
};

const update_oauth_user = ({ unique_provider_id, provider, profile }) => {
  return pgPool.query(`update ${serverConfig.auth_dbname}.oauth2users set profile=$3 where unique_provider_id=$1 and provider=$2 returning *`, [unique_provider_id, provider, profile]) // eslint-disable-line
    .then((res) => {
      if (res.rowCount === 1) {
        return res.rows[0];
      }
      return { success: false };
    });
};


export default {
  get_oauth_user,
  get_oauth_user_by_provider_info,
  get_associated_oauth_users,
  add_oauth_user,
  unlink_oauth_user,
  update_oauth_user,
  authenticate,
};
