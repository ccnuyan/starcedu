const validationRules = {
  username: {
    beforeVal: (val) => {
      return val.toLowerCase();
    },
    regex:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, //eslint-disable-line
  },
  password: {
    regex: /^[A-Za-z0-9]{6,20}$/,
  },
  old_password: {
    regex: /^[A-Za-z0-9]{6,20}$/,
  },
  new_password: {
    regex: /^[A-Za-z0-9]{6,20}$/,
  },
  bind_user_id: {
  },
  oauth_user_id: {
  },
  unique_provider_id: {
  },
  provider: {
  },
  profile: {
  },
};

const validate = (payload, nonNullParamsArray) => {
  const ret = {
    status: true,
    message: '',
  };

  Object.keys(payload).forEach((k) => {
    if (payload[k] && typeof payload[k] === 'string') {
      payload[k] = payload[k].trim(); // eslint-disable-line no-param-reassign
    }
    if (payload[k] && validationRules[k] && validationRules[k].beforeVal) {
      payload[k] = validationRules[k].beforeVal(payload[k]); // eslint-disable-line no-param-reassign
    }
  });

  nonNullParamsArray.every((k) => {
    if (!validationRules[k]) {
      console.log(`no validation rule for non-null parameter ${k} in \n)${JSON.stringify(payload, null, 2)}`); // eslint-disable-line
    } else if (!payload[k]) {
      ret.status = false;
      ret.message = `${k} empty`;
      return false;
    }
    return true;
  });

  if (!ret.status) {
    return ret;
  }

  Object.keys(payload).every((k) => {
    if (!validationRules[k]) {
      // console.log(`no validation rule for parameter ${k} in \n)${JSON.stringify(payload, null, 2)}`);
    } else if (!validationRules[k].regex) {
      // console.log(`no regex rule for parameter ${k}`);
    } else if (!validationRules[k].regex.test(payload[k])) {
      ret.status = false;
      ret.message = `provided ${k} illigal`;
      return false;
    }
    return true;
  });

  return ret;
};

export default {
  validate,
  validationRules,
};
