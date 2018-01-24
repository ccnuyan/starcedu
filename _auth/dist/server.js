module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _config3 = __webpack_require__(20);

var _config4 = _interopRequireDefault(_config3);

var _config5 = __webpack_require__(21);

var _config6 = _interopRequireDefault(_config5);

var _auth = __webpack_require__(22);

var _auth2 = _interopRequireDefault(_auth);

var _disk = __webpack_require__(23);

var _disk2 = _interopRequireDefault(_disk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configVar = {};
if (true) {
  configVar = _config4.default;
} else if (process.env.NODE_ENV === 'test') {
  configVar = _config6.default;
} else {
  configVar = _config2.default;
}
var config = configVar;

var appsConfigs = {
  auth: _auth2.default,
  disk: _disk2.default
};

var commonKeys = Object.keys(config);

Object.keys(appsConfigs).forEach(function (app) {
  commonKeys.forEach(function (k) {
    config[app + '_' + k] = config[k];
  });
});

Object.keys(appsConfigs).forEach(function (app) {
  Object.keys(appsConfigs[app][config.mode]).forEach(function (k) {
    var appConfig = appsConfigs[app][config.mode][k];
    if (typeof appConfig === 'string') {
      config[app + '_' + k] = appConfig;
    } else if (typeof config[k] === 'number') {
      config[app + '_' + k] = appConfig;
    } else if ((typeof appConfig === 'undefined' ? 'undefined' : _typeof(appConfig)) === 'object') {
      if (_typeof(config[app + '_' + k]) === 'object') {
        config[app + '_' + k] = _lodash2.default.merge(config[app + '_' + k], appConfig);
      } else {
        config[app + '_' + k] = appConfig;
      }
    }
  });
});

var chalkcontent = _chalk2.default.grey('running in ');
chalkcontent += config.mode === 'production' ? _chalk2.default.red(config.mode) : _chalk2.default.blue(config.mode);
chalkcontent += _chalk2.default.grey(' mode');

console.log(chalkcontent); // eslint-disable-line

exports.default = config;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _connector = __webpack_require__(5);

var _connector2 = _interopRequireDefault(_connector);

var _tokenServices = __webpack_require__(6);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
    var username = _ref2.username,
        password = _ref2.password,
        oauth_user_id = _ref2.oauth_user_id;
    var gen_token = _ref3.gen_token,
        target_tenant = _ref3.target_tenant;
    var user, oauth_user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {};

            if (!oauth_user_id) {
              _context.next = 10;
              break;
            }

            _context.next = 4;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.oauth2Users where id = $1', [oauth_user_id]).then(function (res) {
              return res.rows[0];
            });

          case 4:
            oauth_user = _context.sent;
            _context.next = 7;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.authenticate($1, $2, $3, $4)', [username, password, 'local', oauth_user.id]).then(function (res) {
              return res.rows[0];
            });

          case 7:
            user = _context.sent;
            _context.next = 13;
            break;

          case 10:
            _context.next = 12;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.authenticate($1, $2)', [username, password]).then(function (res) {
              return res.rows[0];
            });

          case 12:
            user = _context.sent;

          case 13:
            if (!user.id) {
              _context.next = 18;
              break;
            }

            if (!gen_token) {
              _context.next = 18;
              break;
            }

            user.token = (0, _tokenServices.sign)('local', _extends({
              to: target_tenant || 'local'
            }, user));
            _context.next = 18;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.add_login($1, $2, $3, $4)', [user.id, 'token', user.token, 'token']);

          case 18:
            return _context.abrupt('return', user);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authenticate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var register = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5, _ref6) {
    var username = _ref5.username,
        password = _ref5.password,
        oauth_user_id = _ref5.oauth_user_id;
    var gen_token = _ref6.gen_token,
        target_tenant = _ref6.target_tenant;
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = {};

            if (!oauth_user_id) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.register($1,$2,$3)', [username, password, oauth_user_id]).then(function (dbres) {
              var registerInfo = dbres.rows[0];
              return registerInfo;
            });

          case 4:
            user = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.next = 9;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.register($1,$2)', [username, password]).then(function (dbres) {
              var registerInfo = dbres.rows[0];
              return registerInfo;
            });

          case 9:
            user = _context2.sent;

          case 10:
            if (!user.id) {
              _context2.next = 15;
              break;
            }

            if (!gen_token) {
              _context2.next = 15;
              break;
            }

            user.token = (0, _tokenServices.sign)('local', _extends({
              to: target_tenant || 'local'
            }, user));
            _context2.next = 15;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.add_login($1, $2, $3, $4)', [user.id, 'token', user.token, 'token']);

          case 15:
            return _context2.abrupt('return', user);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function register(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var username_check = function username_check(_ref7) {
  var username = _ref7.username;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.users where username=$1', [username]).then(function (res) {
    return {
      valid: res.rowCount < 1,
      username: username
    };
  });
};

var update_password = function update_password(_ref8) {
  var username = _ref8.username,
      old_password = _ref8.old_password,
      new_password = _ref8.new_password;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.update_password($1, $2, $3)', [username, old_password, new_password]).then(function (res) {
    if (res.rowCount === 1) {
      var ret = res.rows[0];
      return ret;
    }
    return { success: false, message: '密码更新失败' };
  });
};

exports.default = {
  authenticate: authenticate,
  register: register,
  username_check: username_check,
  update_password: update_password
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pg = undefined;

var _pg = __webpack_require__(28);

var _pg2 = _interopRequireDefault(_pg);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pg = exports.pg = new _pg2.default.Pool(_serverConfig2.default.pg);

console.log(_chalk2.default.yellow('DATABASE -> ' + _serverConfig2.default.pg.host + ':' + _serverConfig2.default.pg.port + '/' + _serverConfig2.default.pg.database)); // eslint-disable-line

exports.default = {
  query: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, params) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', pg.query(text, params));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function query(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  end: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', pg.end());

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function end() {
      return _ref2.apply(this, arguments);
    };
  }()
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.sign = undefined;

var _jsonwebtoken = __webpack_require__(12);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sign = exports.sign = function sign(issuer, payload) {
  var user = _lodash2.default.pick(payload, ['id', 'username', 'to']);
  return _jsonwebtoken2.default.sign(user, _serverConfig2.default.jwt.secret, {
    expiresIn: _serverConfig2.default.jwt.expiresIn,
    issuer: issuer
  });
};

var verify = exports.verify = function verify(token) {
  return _jsonwebtoken2.default.verify(token, _serverConfig2.default.jwt.secret);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var validationRules = {
  username: {
    beforeVal: function beforeVal(val) {
      return val.toLowerCase();
    },
    regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ //eslint-disable-line
  },
  password: {
    regex: /^[A-Za-z0-9]{6,20}$/
  },
  old_password: {
    regex: /^[A-Za-z0-9]{6,20}$/
  },
  new_password: {
    regex: /^[A-Za-z0-9]{6,20}$/
  },
  bind_user_id: {},
  oauth_user_id: {},
  unique_provider_id: {},
  provider: {},
  profile: {}
};

var validate = function validate(payload, nonNullParamsArray) {
  var ret = {
    status: true,
    message: ''
  };

  Object.keys(payload).forEach(function (k) {
    if (payload[k] && typeof payload[k] === 'string') {
      payload[k] = payload[k].trim(); // eslint-disable-line no-param-reassign
    }
    if (payload[k] && validationRules[k] && validationRules[k].beforeVal) {
      payload[k] = validationRules[k].beforeVal(payload[k]); // eslint-disable-line no-param-reassign
    }
  });

  nonNullParamsArray.every(function (k) {
    if (!validationRules[k]) {
      console.log('no validation rule for non-null parameter ' + k + ' in \n)' + JSON.stringify(payload, null, 2)); // eslint-disable-line
    } else if (!payload[k]) {
      ret.status = false;
      ret.message = k + ' empty';
      return false;
    }
    return true;
  });

  if (!ret.status) {
    return ret;
  }

  Object.keys(payload).every(function (k) {
    if (!validationRules[k]) {
      // console.log(`no validation rule for parameter ${k} in \n)${JSON.stringify(payload, null, 2)}`);
    } else if (!validationRules[k].regex) {
      // console.log(`no regex rule for parameter ${k}`);
    } else if (!validationRules[k].regex.test(payload[k])) {
      ret.status = false;
      ret.message = 'provided ' + k + ' illigal';
      return false;
    }
    return true;
  });

  return ret;
};

exports.default = {
  validate: validate,
  validationRules: validationRules
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * no true/false
 * no underline
 * no functions
 * overide by config.[mode].js
 * overide by _app.config.js
 */

exports.default = {
  title: 'starC教育',
  port: 8000,
  domain: 'www.syncollege.com',
  serviceBase: '/',
  cookie: {
    maxAge: 14 * 24 * 3600 * 1000
  },
  session: {
    secret: '12345678'
  },
  minDelay: 0,
  maxDelay: 0,
  jwt: {
    secret: '12345678'
  },
  userHeader: 'authorization',
  tenantHeader: 'starcedu-tenant-authorization',
  pg: {
    user: process.env.DB_USER ? process.env.DB_USER : 'postgres',
    database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'postgres',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port: process.env.DB_PORT ? process.env.DB_PORT : 5432,
    max: 10,
    idleTimeoutMillis: 30000
  },
  redisSessionServer: {
    host: 'localhost',
    port: 6379
  },
  qiniuBucket: '7xt1pi.com1.z0.glb.clouddn.com',
  qiniu: {
    bucket: 'test',
    mode: 'direct',
    ak: 'JK2nEgwnvAoWh4e7hWyUX3Iuc6fs8-6vL5xNu-kq',
    sk: 'LRKdhh_0T4l_w6q1rbA2T-rNolTogMMjXihigG8x',
    callbackBase: 'http://www.syncollege.com/',
    url: 'http://7xt1pi.com1.z0.glb.clouddn.com'
  },
  stylesheets: {
    normalize: '//cdn.bootcss.com/normalize/6.0.0/normalize.min.css',
    semantic: '/static/semantic/semantic.min.css'
  },
  scripts: {
    jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    head: '//cdn.bootcss.com/headjs/1.0.3/head.min.js',
    html5shiv: '//cdn.bootcss.com/html5shiv/r29/html5.min.js',
    classlist: '//cdn.bootcss.com/classlist/2014.01.31/classList.min.js',
    semantic: '/static/semantic/semantic.min.js'
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(14);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(15);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenants = JSON.parse(_fs2.default.readFileSync(process.env.TENANTS_CONFIG || _path2.default.join(__dirname, './tenants.json'), 'utf-8'));

Object.keys(tenants).forEach(function (t) {
  tenants[t].id = t;
});

exports.default = tenants;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  if (req.user && req.user.id) {
    return next();
  }
  return res.status(401).send({
    code: 401,
    message: 'user unauthenticated'
  });
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenServices = __webpack_require__(6);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _connector = __webpack_require__(5);

var _connector2 = _interopRequireDefault(_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var unique_provider_id = _ref2.unique_provider_id,
        provider = _ref2.provider,
        client = _ref2.client;
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {};
            _context.next = 3;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.oauth_authenticate($1, $2)', [unique_provider_id, provider]) // eslint-disable-line max-len
            .then(function (res) {
              if (res.rowCount === 1) {
                return res.rows[0];
              }
              return { success: false };
            });

          case 3:
            user = _context.sent;

            if (!user.id) {
              _context.next = 10;
              break;
            }

            token = (0, _tokenServices.sign)('local', {
              to: client || 'local',
              user: user
            });

            user.token = token; // 添加login
            _context.next = 9;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.add_login($1, $2, $3, $4)', [user.id, unique_provider_id, token, provider]);

          case 9:
            return _context.abrupt('return', user);

          case 10:
            return _context.abrupt('return', { success: false });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authenticate(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get_associated_oauth_users = function get_associated_oauth_users(_ref3) {
  var user_id = _ref3.user_id;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.oauth2users where user_id = $1', [user_id]).then(function (res) {
    return res.rows;
  });
};

var get_oauth_user_by_provider_info = function get_oauth_user_by_provider_info(_ref4) {
  var unique_provider_id = _ref4.unique_provider_id,
      provider = _ref4.provider;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.oauth2users where unique_provider_id = $1 and provider = $2', [unique_provider_id, provider]).then(function (res) {
    if (res.rowCount === 1) {
      return res.rows[0];
    }
    return false;
  });
};

var add_oauth_user = function add_oauth_user(_ref5) {
  var provider = _ref5.provider,
      unique_provider_id = _ref5.unique_provider_id,
      profile = _ref5.profile;

  return _connector2.default.query('insert into ' + _serverConfig2.default.auth_dbname + '.oauth2users(unique_provider_id, provider, profile) values ($1,$2,$3) returning *', [unique_provider_id, provider, profile]) // eslint-disable-line max-len
  .then(function (res) {
    if (res.rowCount === 1) {
      return res.rows[0];
    }
    return { success: false };
  });
};

var get_oauth_user = function get_oauth_user(_ref6) {
  var oauth_user_id = _ref6.oauth_user_id;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.oauth2users where id = $1', [oauth_user_id]).then(function (res) {
    if (res.rowCount === 1) {
      return res.rows[0];
    }
    return { success: false };
  });
};

var unlink_oauth_user = function unlink_oauth_user(_ref7) {
  var oauth_user_id = _ref7.oauth_user_id,
      bind_user_id = _ref7.bind_user_id;

  return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.unlink_oauth_user($1, $2)', [oauth_user_id, bind_user_id]).then(function (res) {
    return res.rows;
  });
};

var update_oauth_user = function update_oauth_user(_ref8) {
  var unique_provider_id = _ref8.unique_provider_id,
      provider = _ref8.provider,
      profile = _ref8.profile;

  return _connector2.default.query('update ' + _serverConfig2.default.auth_dbname + '.oauth2users set profile=$3 where unique_provider_id=$1 and provider=$2 returning *', [unique_provider_id, provider, profile]) // eslint-disable-line
  .then(function (res) {
    if (res.rowCount === 1) {
      return res.rows[0];
    }
    return { success: false };
  });
};

exports.default = {
  get_oauth_user: get_oauth_user,
  get_oauth_user_by_provider_info: get_oauth_user_by_provider_info,
  get_associated_oauth_users: get_associated_oauth_users,
  add_oauth_user: add_oauth_user,
  unlink_oauth_user: unlink_oauth_user,
  update_oauth_user: update_oauth_user,
  authenticate: authenticate
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(18);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _api2 = __webpack_require__(24);

var _api3 = _interopRequireDefault(_api2);

var _web2 = __webpack_require__(37);

var _web3 = _interopRequireDefault(_web2);

var _sessionMiddleware = __webpack_require__(47);

var _sessionMiddleware2 = _interopRequireDefault(_sessionMiddleware);

var _byPassTenantAuth = __webpack_require__(50);

var _byPassTenantAuth2 = _interopRequireDefault(_byPassTenantAuth);

var _byPassUserAuth = __webpack_require__(51);

var _byPassUserAuth2 = _interopRequireDefault(_byPassUserAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var session2Req = function session2Req(req, res, next) {
  Object.keys(req.session).forEach(function (k) {
    if (k !== 'cookie') req[k] = req.session[k];
  });
  next();
};

exports.default = {
  api: function api(app) {
    app.use('/api/local/*', _sessionMiddleware2.default, session2Req, function (req, res, next) {
      req.authConfig = { gen_token: false };
      next();
    });

    app.use('/api/tenant/*', _byPassUserAuth2.default, _byPassTenantAuth2.default, function (req, res, next) {
      req.authConfig = {
        gen_token: true,
        target_tenant: req.tenant ? req.tenant.id : 'local'
      };
      next();
    });

    (0, _api3.default)(app);

    app.use('/api/status', function (req, res) {
      res.status(200).send({
        message: 'service ok'
      });
    });
    app.use('/api/*', function (req, res) {
      res.status(404).send({
        message: 'no such business'
      });
    });
  },
  web: function web(app) {
    if (_serverConfig2.default.mode !== 'test') {
      app.use('/*', _sessionMiddleware2.default, session2Req);
      (0, _web3.default)(app);
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _common = __webpack_require__(9);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _common2.default, {
  mode: 'development',
  log: 'tiny',
  minDelay: 300,
  maxDelay: 1000
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _common = __webpack_require__(9);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _common2.default, {
  pg: {
    user: process.env.DBUSER ? process.env.DBUSER : 'postgres',
    database: process.env.DBDATABASE ? process.env.DBDATABASE : 'postgres',
    password: process.env.DBPASSWORD ? process.env.DBPASSWORD : '',
    host: process.env.DBHOST ? process.env.DBHOST : 'database',
    port: process.env.DBPORT ? process.env.DBPORT : 5432,
    max: 10,
    idleTimeoutMillis: 30000
  },
  mode: 'production'
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _common = __webpack_require__(9);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _common2.default, {
  mode: 'test'
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  development: {
    dbname: 'starcedu_auth', port: 8000
  },
  production: {
    dbname: 'starcedu_auth'
  },
  test: {
    dbname: 'starcedu_auth',
    port: 8001
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  development: {
    dbname: 'starcedu_disk', port: 18000
  },
  production: {
    dbname: 'starcedu_disk'
  },
  test: {
    dbname: 'starcedu_disk',
    port: 18001
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(25);

var _user2 = _interopRequireDefault(_user);

var _oauth = __webpack_require__(32);

var _oauth2 = _interopRequireDefault(_oauth);

var _tenantAuthMiddleware = __webpack_require__(36);

var _tenantAuthMiddleware2 = _interopRequireDefault(_tenantAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/api/local/user', _user2.default);
  app.use('/api/local/oauth', _oauth2.default);
  app.use('/api/tenant/user', _tenantAuthMiddleware2.default, _user2.default);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _authMiddleware = __webpack_require__(11);

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _me = __webpack_require__(26);

var _me2 = _interopRequireDefault(_me);

var _signin = __webpack_require__(27);

var _signin2 = _interopRequireDefault(_signin);

var _signup = __webpack_require__(29);

var _signup2 = _interopRequireDefault(_signup);

var _signout = __webpack_require__(30);

var _signout2 = _interopRequireDefault(_signout);

var _update_password = __webpack_require__(31);

var _update_password2 = _interopRequireDefault(_update_password);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/me', _authMiddleware2.default, _me2.default);
router.post('/signin', _signin2.default);
router.post('/signup', _signup2.default);
router.get('/signout', _signout2.default);
router.put('/update_password', _authMiddleware2.default, _update_password2.default);

exports.default = router;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var me = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.session.user) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', res.status(200).send({
              message: 'success',
              data: req.session.user
            }));

          case 2:
            res.status(401).send({
              message: 'Unauthenticated'
            });

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function me(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = me;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _userServices = __webpack_require__(4);

var _userServices2 = _interopRequireDefault(_userServices);

var _paramsValidator = __webpack_require__(7);

var _paramsValidator2 = _interopRequireDefault(_paramsValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signin = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var payload, valRet, ret, pickedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              autoSignin: req.body.autoSignin,
              username: req.body.username,
              password: req.body.password
            };
            valRet = _paramsValidator2.default.validate(payload, ['username', 'password']);

            if (valRet.status) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).json(valRet));

          case 4:

            if (req.oauthUser && req.oauthUser.id) {
              payload.oauth_user_id = req.session.oauthUser.id;
            }

            _context.next = 7;
            return _userServices2.default.authenticate(payload, req.authConfig);

          case 7:
            ret = _context.sent;
            pickedUser = _lodash2.default.pick(ret, ['username', 'id', 'token']);


            if (ret.success) {
              if (req.session) {
                req.session.user = pickedUser;
                if (payload.autoSignin === true) {
                  req.session.cookie.maxAge = _serverConfig2.default.cookie.maxAge;
                } else {
                  req.session.cookie.expires = false;
                }
                // if there is a tenant, save the callback for the case callback from 3rd party provider.
                req.session.callback = '/';
              }
              res.json({
                data: _extends({}, pickedUser, {
                  // if there is a tenant, to decide is the first priority.
                  callback: req.callback
                }),
                message: ret.message
              });
            } else {
              if (req.session) {
                req.session.user = {};
              }
              res.status(400).json({
                message: ret.message
              });
            }

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = signin;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _userServices = __webpack_require__(4);

var _userServices2 = _interopRequireDefault(_userServices);

var _paramsValidator = __webpack_require__(7);

var _paramsValidator2 = _interopRequireDefault(_paramsValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signup = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var payload, valRet, ret, pickedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              username: req.body.username,
              password: req.body.password
            };
            valRet = _paramsValidator2.default.validate(payload, ['username', 'password']);

            if (valRet.status) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).json(valRet));

          case 4:

            if (req.oauthUser && req.oauthUser.id) {
              payload.oauth_user_id = req.oauthUser.id;
            }

            _context.next = 7;
            return _userServices2.default.register(payload, req.authConfig);

          case 7:
            ret = _context.sent;
            pickedUser = _lodash2.default.pick(ret, ['username', 'id', 'token']);


            if (ret.success) {
              if (req.session) {
                req.session.oauthUser = {};
                req.session.user = ret;
              }
              res.json({
                data: pickedUser,
                message: ret.message
              });
            } else {
              if (req.session) {
                req.session.oauthUser = {};
                req.session.user = {};
              }
              res.status(400).json({
                message: ret.message
              });
            }

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = signup;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var signout = function signout(req, res) {
  req.session.oauthUser = {};
  req.session.user = {};
  res.json({
    message: 'user session reset'
  });
};

exports.default = signout;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userServices = __webpack_require__(4);

var _userServices2 = _interopRequireDefault(_userServices);

var _paramsValidator = __webpack_require__(7);

var _paramsValidator2 = _interopRequireDefault(_paramsValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var update_password = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var payload, valRet, ret;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              old_password: req.body.old_password,
              new_password: req.body.new_password
            };


            payload.username = req.user.username;

            valRet = _paramsValidator2.default.validate(payload, ['old_password', 'new_password']);

            if (valRet.status) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(400).json(valRet));

          case 5:
            _context.next = 7;
            return _userServices2.default.update_password(payload);

          case 7:
            ret = _context.sent;


            if (ret.success) {
              if (req.session) {
                req.session.user = {};
              }
              res.status(200).json({
                data: ret,
                message: ret.message
              });
            } else {
              res.status(400).json({
                message: ret.message
              });
            }

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function update_password(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = update_password;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _rd_party_unlink = __webpack_require__(33);

var _rd_party_unlink2 = _interopRequireDefault(_rd_party_unlink);

var _rd_party_signout = __webpack_require__(34);

var _rd_party_signout2 = _interopRequireDefault(_rd_party_signout);

var _tenant_signout = __webpack_require__(35);

var _tenant_signout2 = _interopRequireDefault(_tenant_signout);

var _authMiddleware = __webpack_require__(11);

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// these are for 3rd party authentication providers
router.get('/3rd_party_signout', _rd_party_signout2.default);
router.put('/3rd_party_unlink', _authMiddleware2.default, _rd_party_unlink2.default);

// these are for tennants
router.get('/tenant_signout', _tenant_signout2.default);

exports.default = router;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oauthServices = __webpack_require__(13);

var _oauthServices2 = _interopRequireDefault(_oauthServices);

var _userServices = __webpack_require__(4);

var _userServices2 = _interopRequireDefault(_userServices);

var _paramsValidator = __webpack_require__(7);

var _paramsValidator2 = _interopRequireDefault(_paramsValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var unlink = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var payload, ret;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              bind_user_id: req.session.user.id,
              oauth_user_id: req.body.oauth_user_id,
              password: req.body.password
            };

            if (_paramsValidator2.default.validate(payload, ['bind_user_id', 'oauth_user_id', 'password'], res)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            _context.next = 5;
            return _userServices2.default.authenticate({
              username: payload.bind_user_id,
              password: payload.password
            }, {
              gen_token: false
            });

          case 5:
            ret = _context.sent;

            if (!ret.success) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return _oauthServices2.default.unlink_oauth_user({
              bind_user_id: req.user.id,
              oauth_user_id: req.body.oauth_user_id,
              password: req.body.password
            });

          case 9:
            res.status(400).json({
              data: ret,
              message: 'oauth user unlink successfully'
            });
            _context.next = 13;
            break;

          case 12:
            res.status(400).json({
              message: 'password invalid'
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function unlink(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = unlink;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var signout = function signout(req, res) {
  req.session.oauthUser = {};
  res.json({
    message: 'oauth session reset'
  });
};

exports.default = signout;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var signout = function signout(req, res) {
  req.session.tenant = {};
  res.json({
    message: 'tenant session reset'
  });
};

exports.default = signout;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  if (req.tenant && req.tenant.id) {
    return next();
  }
  res.status(401).send({
    code: 401,
    message: 'tenant unauthenticated'
  });
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _indexFabricator = __webpack_require__(38);

var _indexFabricator2 = _interopRequireDefault(_indexFabricator);

var _callback = __webpack_require__(39);

var _callback2 = _interopRequireDefault(_callback);

var _qq = __webpack_require__(43);

var _qq2 = _interopRequireDefault(_qq);

var _authorize = __webpack_require__(45);

var _authorize2 = _interopRequireDefault(_authorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var oauthControllers = { callback: _callback2.default };
var oauthProviders = { qq: _qq2.default };

exports.default = function (app) {
  Object.keys(oauthControllers).forEach(function (ck) {
    app.use('/oauth/' + ck, function (req, res, next) {
      return oauthControllers[ck](req, res, next);
    }); // notice here is use not route
  });

  Object.keys(oauthProviders).forEach(function (ck) {
    app.use('/oauth/luanch/' + ck, function (req, res, next) {
      return oauthProviders[ck](req, res, next);
    }); // notice here is use not route
  });

  app.get('/user/signin', function (req, res, next) {
    if (req.query.cb) {
      if (req.session) {
        req.session.callback = req.query.cb;
      }
    } else {
      if (req.session) {
        // eslint-disable-line
        req.session.callback = '/';
      }
    }
    next();
  });

  app.get('/user/authorize', _authorize2.default.authorize);
  app.post('/user/decide', _authorize2.default.decide);
  app.post('/user/token_by_code', _authorize2.default.get_token);

  app.get('/*', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var ignoreArray, preloadedState;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // clear short-term session
              ignoreArray = ['/oauth/callback', '/user/authorize'];


              if (_lodash2.default.every(ignoreArray, function (entry) {
                return !req.path.startsWith(entry);
              })) {
                req.session.tenant = {};
                req.session.oauthUser = {};
              }

              Object.keys(req.session).forEach(function (k) {
                if (k !== 'cookie') req[k] = req.session[k];
              });

              // preloaded store object
              preloadedState = {
                user: {
                  user: req.user || {},
                  oauthUser: req.oauthUser || {},
                  tenant: req.tenant || {},
                  callback: req.callback
                }
              };


              res.send((0, _indexFabricator2.default)('auth').replace('_starc_server_state_', JSON.stringify(preloadedState, null, 2)));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(14);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(15);

var _path2 = _interopRequireDefault(_path);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexFactory = {};

exports.default = function (app) {
  if (!indexFactory[app]) {
    var contents = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../build/assets.json'), 'utf-8');

    // Define to JSON type
    var assets = JSON.parse(contents);

    var rawIndexHTML = _fs2.default.readFileSync(_path2.default.join(__dirname, './index.html'), 'utf-8');

    rawIndexHTML = rawIndexHTML.replace('_starc_edu_title_', _serverConfig2.default.title);

    // styles

    var styles = Object.keys(_serverConfig2.default.disk_stylesheets).map(function (key) {
      return '<link href="' + _serverConfig2.default.disk_stylesheets[key] + '" rel="stylesheet"/>';
    });
    if (assets[app].css) {
      styles.push('<link href="' + assets[app].css + '" rel="stylesheet"/>');
    }
    rawIndexHTML = rawIndexHTML.replace('_starc_edu_styles_', styles.join('\n'));

    // scripts

    var scripts = Object.keys(_serverConfig2.default.disk_scripts).map(function (key) {
      return '<script src="' + _serverConfig2.default.disk_scripts[key] + '"></script>';
    });
    scripts.push('<script src="' + assets.vendor.js + '"></script>');

    if (assets[app].js) {
      scripts.push('<script src="' + assets[app].js + '"></script>');
    }
    scripts.push('<script src="' + assets[app].js + '"></script>');

    rawIndexHTML = rawIndexHTML.replace('_starc_edu_scripts_', scripts.join('\n'));

    // register

    indexFactory[app] = rawIndexHTML;
  }

  return indexFactory[app];
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _qqMiddleware = __webpack_require__(40);

var _qqMiddleware2 = _interopRequireDefault(_qqMiddleware);

var _oauthServices = __webpack_require__(13);

var _oauthServices2 = _interopRequireDefault(_oauthServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express.Router)();

router.get('/qq', _qqMiddleware2.default);

router.get('/:vender', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var oauthUser, ret, payload, loginInfo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _oauthServices2.default.get_oauth_user_by_provider_info({
              unique_provider_id: req.oauth.unique_provider_id,
              provider: req.oauth.provider
            });

          case 2:
            oauthUser = _context.sent;

            if (oauthUser) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return _oauthServices2.default.add_oauth_user({
              unique_provider_id: req.oauth.unique_provider_id,
              provider: req.oauth.provider,
              profile: req.oauth.profile
            });

          case 6:
            ret = _context.sent;

            oauthUser = ret;

          case 8:
            if (oauthUser.user_id) {
              _context.next = 13;
              break;
            }

            // oauth未绑定
            req.session.oauthUser = oauthUser;
            next();
            _context.next = 20;
            break;

          case 13:
            // oauth登录过且已绑定
            req.session.oauthUser = {};
            payload = {
              unique_provider_id: req.oauth.unique_provider_id,
              provider: req.oauth.provider
            };
            _context.next = 17;
            return _oauthServices2.default.authenticate(payload);

          case 17:
            loginInfo = _context.sent;

            req.session.user = loginInfo;
            next();

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = __webpack_require__(8);

var _querystring2 = _interopRequireDefault(_querystring);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _goGet = __webpack_require__(41);

var _goGet2 = _interopRequireDefault(_goGet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var qqMiddleware = function qqMiddleware(req, res, next) {
  // ref http://wiki.connect.qq.com/oauth2-0%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3
  var _req$query = req.query,
      state = _req$query.state,
      code = _req$query.code;

  // TODO verify state

  var query = {
    grant_type: 'authorization_code',
    state: state,
    code: code,
    client_id: _serverConfig2.default.oauth.qq.app_id,
    client_secret: _serverConfig2.default.oauth.qq.app_key,
    redirect_uri: _serverConfig2.default.oauth.qq.redirect_uri
  };

  // go get the token
  (0, _goGet2.default)(_serverConfig2.default.oauth.qq.pcTokenHost, query, function (err1, rs1, bd1) {
    if (err1) {
      return next(err1);
    }

    var _querystring$parse = _querystring2.default.parse(bd1),
        access_token = _querystring$parse.access_token,
        expires_in = _querystring$parse.expires_in,
        refresh_token = _querystring$parse.refresh_token; // eslint-disable-line

    // go get the openid


    (0, _goGet2.default)(_serverConfig2.default.oauth.qq.pcOpenidHost, { access_token: access_token }, function (err2, rs2, bd2) {
      if (err2) {
        return next(err2);
      }
      var bodyObject = JSON.parse(bd2.match(/{.+}/)[0]);
      var openid = bodyObject.openid;

      req.oauth = {
        provider: 'qq',
        qq: {
          openid: openid,
          access_token: access_token
        }
      };

      // go get the user info
      (0, _goGet2.default)(_serverConfig2.default.oauth.qq.infoHost, {
        openid: openid,
        oauth_consumer_key: _serverConfig2.default.oauth.qq.app_id,
        access_token: access_token
      }, function (err3, rs3, bd3) {
        // eslint-disable-line
        if (err3) {
          return next(err3);
        }

        /*
          { ret: 0,
          msg: '',
          is_lost: 0,
          nickname: '严程序',
          gender: '男',
          province: '湖北',
          city: '武汉',
          year: '1983',
          figureurl: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/30',
          figureurl_1: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/50',
          figureurl_2: 'http://qzapp.qlogo.cn/qzapp/101271080/DC2161A5A64497EDC71552DF6850E092/100',
          figureurl_qq_1: 'http://q.qlogo.cn/qqapp/101271080/DC2161A5A64497EDC71552DF6850E092/40',
          figureurl_qq_2: 'http://q.qlogo.cn/qqapp/101271080/DC2161A5A64497EDC71552DF6850E092/100',
          is_yellow_vip: '0',
          vip: '0',
          yellow_vip_level: '0',
          level: '0',
          is_yellow_year_vip: '0' }
        */

        req.oauth = {
          provider: 'qq',
          unique_provider_id: openid,
          profile: bd3
        };

        next('route');
      });
    });
  });
};

exports.default = qqMiddleware;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = __webpack_require__(8);

var _querystring2 = _interopRequireDefault(_querystring);

var _request = __webpack_require__(42);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * goGet - sugar for request
 *
 * @param  {type} url      url to request
 * @param  {type} params   params object in query
 * @param  {type} callback callback function
 * @return {type}          undefined
 */
function goGet(url, params, callback) {
  (0, _request2.default)({
    method: 'GET',
    uri: url + '?' + _querystring2.default.stringify(params),
    json: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }, callback);
}

exports.default = goGet;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _uuid = __webpack_require__(44);

var _uuid2 = _interopRequireDefault(_uuid);

var _querystring = __webpack_require__(8);

var _querystring2 = _interopRequireDefault(_querystring);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/', function (req, res) {
  var state = _uuid2.default.v4();

  var query = {
    response_type: 'code',
    scope: 'get_user_info',
    client_id: _serverConfig2.default.oauth.qq.app_id,
    redirect_uri: _serverConfig2.default.oauth.qq.redirect_uri,
    state: state
  };
  var location = _serverConfig2.default.oauth.qq.pcCodeHost + '?' + _querystring2.default.stringify(query);
  res.redirect(location);
});

exports.default = router;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _querystring = __webpack_require__(8);

var _querystring2 = _interopRequireDefault(_querystring);

var _tenants = __webpack_require__(10);

var _tenants2 = _interopRequireDefault(_tenants);

var _authorizeServices = __webpack_require__(46);

var _authorizeServices2 = _interopRequireDefault(_authorizeServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authorize = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var cl, tenant;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.query.tenant && req.query.state) {
              cl = req.query.tenant;

              if (_tenants2.default[cl]) {
                tenant = _lodash2.default.pick(_tenants2.default[cl], ['id', 'title', 'description', 'redirect_url', 'home_url']);

                req.session.tenant = _extends({
                  state: req.query.state
                }, tenant);
              }
            }
            next();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authorize(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var decide = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var payload, codeStruct, tenant, query;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.session.tenant) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', res.redirect('/error'));

          case 2:
            payload = {
              tenant: req.tenant.id,
              state: req.tenant.state,
              user_id: req.user.id
            };

            req.session.tenant = {};

            _context2.next = 6;
            return _authorizeServices2.default.generateCode(payload);

          case 6:
            codeStruct = _context2.sent;

            if (!codeStruct.success) {
              _context2.next = 11;
              break;
            }

            tenant = _tenants2.default[codeStruct.tenant];
            query = _querystring2.default.stringify({
              code: codeStruct.code,
              state: codeStruct.state
            });
            return _context2.abrupt('return', res.redirect(tenant.redirect_url + '?' + query));

          case 11:
            next();

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function decide(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var get_token = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tokenStruct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _authorizeServices2.default.exchange_code_for_token({ code: req.body.code, token: req.body.token });

          case 2:
            tokenStruct = _context3.sent;

            if (!tokenStruct.success) {
              _context3.next = 6;
              break;
            }

            tokenStruct = _lodash2.default.pick(tokenStruct, ['id', 'username', 'token']);
            return _context3.abrupt('return', res.send(_extends({}, tokenStruct)));

          case 6:
            return _context3.abrupt('return', res.send(_extends({}, tokenStruct, {
              message: 'get token error'
            })));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function get_token(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  authorize: authorize,
  decide: decide,
  get_token: get_token
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = __webpack_require__(12);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _tenants = __webpack_require__(10);

var _tenants2 = _interopRequireDefault(_tenants);

var _connector = __webpack_require__(5);

var _connector2 = _interopRequireDefault(_connector);

var _tokenServices = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var generateCode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var tenant = _ref2.tenant,
        state = _ref2.state,
        user_id = _ref2.user_id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _connector2.default.query('insert into ' + _serverConfig2.default.auth_dbname + '.authorization_codes (tenant, state,  user_id) values ($1, $2, $3) returning *', [tenant, state, user_id]) // eslint-disable-line max-len
            .then(function (res) {
              if (res.rowCount === 1) {
                return _extends({ success: true }, res.rows[0]);
              }
              return { success: false };
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateCode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var exchange_code_for_token = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
    var code = _ref4.code,
        token = _ref4.token;
    var codeStruct, decodedcode, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.authorization_codes where code=$1', [code]).then(function (res) {
              if (res.rowCount === 1) {
                return _extends({ success: true }, res.rows[0]);
              }
              return { success: false };
            });

          case 2:
            codeStruct = _context2.sent;

            if (codeStruct.success) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', { success: false });

          case 5:
            decodedcode = _jsonwebtoken2.default.verify(token, _tenants2.default[codeStruct.tenant].key);

            if (!(decodedcode !== code)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', { success: false });

          case 8:
            _context2.next = 10;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.users where id=$1', [codeStruct.user_id]).then(function (res) {
              return res.rows[0];
            });

          case 10:
            user = _context2.sent;


            user.token = (0, _tokenServices.sign)('local', _extends({ to: codeStruct.tenant }, user));

            _context2.next = 14;
            return _connector2.default.query('select * from ' + _serverConfig2.default.auth_dbname + '.add_login($1, $2, $3, $4)', [user.id, 'token', user.token, 'token']);

          case 14:
            _context2.next = 16;
            return _connector2.default.query('delete from ' + _serverConfig2.default.auth_dbname + '.authorization_codes where code=$1', [code]);

          case 16:
            return _context2.abrupt('return', _extends({
              success: true
            }, user));

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function exchange_code_for_token(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  generateCode: generateCode,
  exchange_code_for_token: exchange_code_for_token
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectRedis = __webpack_require__(48);

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _expressSession = __webpack_require__(49);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = (0, _connectRedis2.default)(_expressSession2.default);

var ssConfig = {
  secret: _serverConfig2.default.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  }
};

if (_serverConfig2.default.mode !== 'test') {
  ssConfig.store = new RedisStore(_serverConfig2.default.redisSessionServer);
  console.log(_chalk2.default.green('SESSION --> ' + _serverConfig2.default.redisSessionServer.host + ':' + _serverConfig2.default.redisSessionServer.port)); // eslint-disable-line
} else {
  console.log(_chalk2.default.green('SESSION --> server memory')); // eslint-disable-line
}

var sessionMiddleware = (0, _expressSession2.default)(ssConfig);

exports.default = sessionMiddleware;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _tenants = __webpack_require__(10);

var _tenants2 = _interopRequireDefault(_tenants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             this middleware won't interupt the anonymous accessing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */


exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var breaks, credentials;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.headers[_serverConfig2.default.tenantHeader]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', next());

          case 2:
            // authorization not in right format: bypass
            breaks = req.headers[_serverConfig2.default.tenantHeader].split(' ');

            if (!(breaks.length !== 2)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', next());

          case 5:
            if (!(breaks[1] === 'null' || breaks[1] === 'undefined')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', next());

          case 7:

            // tenant basic authentication
            if (breaks[0] === 'basic') {
              credentials = new Buffer(breaks[1], 'base64').toString().split(':');

              if (credentials.length === 2) {
                // validataion
                if (_tenants2.default[credentials[0]] && _tenants2.default[credentials[0]].pass === credentials[1]) {
                  req.tenant = _tenants2.default[credentials[0]];
                }
              }
            }
            next();

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _tokenServices = __webpack_require__(6);

var _connector = __webpack_require__(5);

var _connector2 = _interopRequireDefault(_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             this middleware won't interupt the anonymous accessing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */


exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var breaks, decoded, pres;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.headers[_serverConfig2.default.userHeader]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', next());

          case 2:
            // authorization not in right format: bypass
            breaks = req.headers[_serverConfig2.default.userHeader].split(' ');

            if (!(breaks.length !== 2)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', next());

          case 5:
            if (!(breaks[1] === 'null' || breaks[1] === 'undefined')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', next());

          case 7:
            _context.prev = 7;

            if (!(breaks[0] === 'bearer')) {
              _context.next = 14;
              break;
            }

            decoded = (0, _tokenServices.verify)(breaks[1]);
            _context.next = 12;
            return _connector2.default.query('select * from ' + _serverConfig2.default.dbname + '.authenticate($1, $2, $3)', ['token', breaks[1], 'token']).then(function (ret) {
              return ret.rows[0];
            });

          case 12:
            pres = _context.sent;


            if (pres.success) {
              req.user = decoded;
            }

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](7);

            console.log(_chalk2.default.red(_context.t0)); // eslint-disable-line 

          case 19:
            _context.prev = 19;

            next();
            return _context.finish(19);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[7, 16, 19, 22]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map