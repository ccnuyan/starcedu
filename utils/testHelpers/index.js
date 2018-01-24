import chai from 'chai';
import chaiHttp from 'chai-http';

import '../../serverConfig';
import pgPool from '../../db/connector';

chai.should();

// http://chaijs.com/api/bdd/
after((done) => {
  pgPool.end();
  done();
});

global.should = chai.should();
global.chai = chai;
global.expect = chai.expect;
chai.use(chaiHttp);
