import { fromJS } from 'immutable';
import actionTypes from '../actionTypes';

const userinit = fromJS({
  user: {},
  submitInfo: {},
});

/* eslint-disable no-param-reassign */
export default (state = userinit, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNIN_START: {
      state = state.set('user', fromJS({}));
      return state;
    }
    case actionTypes.USER_SIGNIN_END: {
      state = state.set('user', fromJS(action.payload.data));
      return state;
    }
    case actionTypes.USER_SIGNIN_ERROR: {
      state = state.set('user', fromJS({}));
      return state;
    }
    case actionTypes.USER_SIGNUP_START: {
      state = state.set('user', fromJS({}));
      return state;
    }
    case actionTypes.USER_SIGNUP_END: {
      state = state.set('user', fromJS(action.payload.data));
      return state;
    }
    case actionTypes.USER_SIGNUP_ERROR: {
      state = state.set('user', fromJS({}));
      return state;
    }
    case actionTypes.USER_SIGNOUT_START: {
      return state;
    }
    case actionTypes.USER_SIGNOUT_END: {
      state = state.set('user', fromJS({}));
      state = state.set('oauthUser', fromJS({}));
      return state;
    }
    case actionTypes.USER_SIGNOUT_ERROR: {
      state = state.set('user', fromJS({}));
      state = state.set('oauthUser', fromJS({}));
      return state;
    }
    case actionTypes.USER_TENANT_SIGNOUT_START: {
      return state;
    }
    case actionTypes.USER_TENANT_SIGNOUT_END: {
      state = state.set('tenant', fromJS({}));
      return state;
    }
    case actionTypes.USER_TENANT_SIGNOUT_ERROR: {
      state = state.set('tenant', fromJS({}));
      return state;
    }
    case actionTypes.USER_OAUTH_SIGNOUT_START: {
      return state;
    }
    case actionTypes.USER_OAUTH_SIGNOUT_END: {
      state = state.set('oauthUser', fromJS({}));
      return state;
    }
    case actionTypes.USER_OAUTH_SIGNOUT_ERROR: {
      state = state.set('oauthUser', fromJS({}));
      return state;
    }
    case actionTypes.USER_UPDATE_PASSWORD_START: {
      return state;
    }
    case actionTypes.USER_UPDATE_PASSWORD_END: {
      state = state.set('user', fromJS({}));
      return state;
    }
    case actionTypes.USER_UPDATE_PASSWORD_ERROR: {
      return state;
    }
    case actionTypes.USER_SET_SUBMIT_INFO: {
      Object.keys(action.payload).forEach((k) => {
        state = state.setIn(['submitInfo', k], action.payload[k]);
      });
      return state;
    }
    default: {
      return state;
    }
  }
};
