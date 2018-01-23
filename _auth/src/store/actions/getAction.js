import fetchMiddleware from './fetchMiddlware';
import utils from '../../utils';
import messageMiddleware from './messageMiddleware';

const delay = (time) => {
  return new Promise(res => setTimeout(() => res(), time)); // eslint-disable-line 
};

const getAction = (params) => {
  return async (dispatch) => {
    const payload = {
      method: params.method,
      credentials: 'include',
      headers: utils.getHeaders(),
    };

    if (params.body) {
      payload.body = JSON.stringify(params.body);
    }

    if (params.actionTypes.start) {
      dispatch(messageMiddleware({ type: params.actionTypes.start }));
    }

    await delay(800);

    fetch(params.url, payload)
        .then(fetchMiddleware)
        .then((ret) => {
          if (params.actionTypes.end) {
            dispatch(messageMiddleware({ type: params.actionTypes.end, payload: ret }));
          }
        }).catch((err) => {
          if (params.actionTypes.error) {
            dispatch(messageMiddleware({ type: params.actionTypes.error, payload: err }));
          }
        });
  };
};

export default getAction;
