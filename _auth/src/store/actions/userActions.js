import actionTypes from '../actionTypes';
import config from '../../frontend/config';
import getAction from './getAction';

const base = config.serviceBase;

/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */

const signin = info => getAction({
  method: 'POST',
  url: `${base}api/local/user/signin`,
  body: info,
  actionTypes: {
    start: actionTypes.USER_SIGNIN_START,
    end: actionTypes.USER_SIGNIN_END,
    error: actionTypes.USER_SIGNIN_ERROR,
  },
});

const signup = info => getAction({
  method: 'POST',
  url: `${base}api/local/user/signup`,
  body: info,
  actionTypes: {
    start: actionTypes.USER_SIGNUP_START,
    end: actionTypes.USER_SIGNUP_END,
    error: actionTypes.USER_SIGNUP_ERROR,
  },
});

const signout = () => getAction({
  method: 'GET',
  url: `${base}api/local/user/signout`,
  actionTypes: {
    start: actionTypes.USER_SIGNOUT_START,
    end: actionTypes.USER_SIGNOUT_END,
    error: actionTypes.USER_SIGNOUT_ERROR,
  },
});

const update_password = info => getAction({
  method: 'PUT',
  url: `${base}api/local/user/update_password`,
  body: info,
  actionTypes: {
    start: actionTypes.USER_UPDATE_PASSWORD_START,
    end: actionTypes.USER_UPDATE_PASSWORD_END,
    error: actionTypes.USER_UPDATE_PASSWORD_ERROR,
  },
});

const oauth_signout = () => getAction({
  method: 'GET',
  url: `${base}api/local/oauth/3rd_party_signout`,
  actionTypes: {
    start: actionTypes.USER_OAUTH_SIGNOUT_START,
    end: actionTypes.USER_OAUTH_SIGNOUT_END,
    error: actionTypes.USER_OAUTH_SIGNOUT_ERROR,
  },
});

const tenant_signout = () => getAction({
  method: 'GET',
  url: `${base}api/local/oauth/tenant_signout`,
  actionTypes: {
    start: actionTypes.USER_TENANT_SIGNOUT_START,
    end: actionTypes.USER_TENANT_SIGNOUT_END,
    error: actionTypes.USER_TENANT_SIGNOUT_ERROR,
  },
});

const oauth_unlink = info => getAction({
  method: 'POST',
  url: `${base}api/local/oauth/unlink`,
  actionTypes: {
    start: actionTypes.USER_OAUTH_UNLINK_START,
    end: actionTypes.USER_OAUTH_UNLINK_END,
    error: actionTypes.USER_OAUTH_UNLINK_ERROR,
  },
  body: info,
});

const setAutoSignin = (dispatch, value) => {
  dispatch({
    type: actionTypes.USER_SET_SUBMIT_INFO,
    payload: {
      autoSignin: value,
    },
  });
};

const setSubmitInfo = (dispatch, info) => {
  dispatch({
    type: actionTypes.USER_SET_SUBMIT_INFO,
    payload: info,
  });
};

export default {
  signin,
  signup,
  signout,
  update_password,
  oauth_unlink,
  oauth_signout,
  tenant_signout,
  setAutoSignin,
  setSubmitInfo,
};
