import querystring from 'querystring';
import request from 'request';

/**
 * goGet - sugar for request
 *
 * @param  {type} url      url to request
 * @param  {type} params   params object in query
 * @param  {type} callback callback function
 * @return {type}          undefined
 */
function goGet(url, params, callback) {
  request({
    method: 'GET',
    uri: `${url}?${querystring.stringify(params)}`,
    json: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }, callback);
}

export default goGet;
