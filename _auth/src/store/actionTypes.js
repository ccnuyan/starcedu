const types = {
};

export const syncTypes = [
  'USER_SET_SUBMIT_INFO',
  'SET_PRISTINE',
];
export const asyncTypes = [
  'USER_SIGNIN',
  'USER_SIGNUP',
  'USER_SIGNOUT',
  'USER_OAUTH_SIGNOUT',
  'USER_OAUTH_UNLINK',
  'USER_UPDATE_PASSWORD',
  'USER_TENANT_SIGNOUT',
];

syncTypes.forEach((tp) => {
  types[tp] = tp;
});

asyncTypes.forEach((tp) => {
  types[`${tp}_START`] = `${tp}_START`;
  types[`${tp}_END`] = `${tp}_END`;
  types[`${tp}_ERROR`] = `${tp}_START`;
});

Object.keys(types).forEach((key) => {
  types[key] = key;
});

export default types;
