/*
 * no true/false
 * no underline
 * no functions
 * overide by config.[mode].js
 * overide by _app.config.js
 */

export default {
  title: 'starC教育',
  port: 18000,
  domain: 'www.syncollege.com',
  serviceBase: '/',
  maxDelay: 1000,
  session: {
    secret: '12345678',
  },
  jwt: {
    secret: '12345678',
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
    idleTimeoutMillis: 30000,
  },
  redisSessionServer: {
    host: 'localhost',
    port: 6379,
  },
  qiniuBucket: '7xt1pi.com1.z0.glb.clouddn.com',
  qiniu: {
    bucket: 'test',
    mode: 'direct',
    ak: 'JK2nEgwnvAoWh4e7hWyUX3Iuc6fs8-6vL5xNu-kq',
    sk: 'LRKdhh_0T4l_w6q1rbA2T-rNolTogMMjXihigG8x',
    callbackBase: 'http://www.syncollege.com/',
    url: 'http://7xt1pi.com1.z0.glb.clouddn.com',
  },
  stylesheets: {
    normalize: '//cdn.bootcss.com/normalize/6.0.0/normalize.min.css',
    semantic: '/static/semantic/semantic.min.css',
  },
  scripts: {
    jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    head: '//cdn.bootcss.com/headjs/1.0.3/head.min.js',
    html5shiv: '//cdn.bootcss.com/html5shiv/r29/html5.min.js',
    classlist: '//cdn.bootcss.com/classlist/2014.01.31/classList.min.js',
    semantic: '/static/semantic/semantic.min.js',
  },
};
