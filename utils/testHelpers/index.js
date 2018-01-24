import chai from 'chai';
import chaiHttp from 'chai-http';
import auth from '../../_auth';
import disk from '../../_disk';

import '../../serverConfig';
import pgPool from '../../db/connector';

chai.should();

// http://chaijs.com/api/bdd/
after(async () => {
  pgPool.end();
  auth.close();
  disk.close();
  return Promise.resolve();
});

global.should = chai.should();
global.chai = chai;
global.expect = chai.expect;
chai.use(chaiHttp);
