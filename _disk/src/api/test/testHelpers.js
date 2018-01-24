import chai from 'chai';
import chaiHttp from 'chai-http';

import pgPool from '../../../../db/connector';
import app from '../../../';

global.should = chai.should();
global.chai = chai;
global.expect = chai.expect;
chai.use(chaiHttp);

after((done) => {
  pgPool.end();
  app.close(done);
});
