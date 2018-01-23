import chai from 'chai';

import '../serverConfig';
import pgPool from './connector';

chai.should();

// http://chaijs.com/api/bdd/
after((done) => {
  pgPool.end();
  done();
});

