import serverConfig from '../../../serverConfig';
import pgPool from '../../../db/connector';
import '../../../utils/testHelpers';

let regResult = null;
const params = {
  username: 'ccnuyan',
  password: 'password',
};

describe('db user signin', () => {
  beforeEach(async function init() {
    this.timeout(2000);
    await pgPool.query(`delete from ${serverConfig.auth_dbname}.users`);
    await pgPool.query(`select * from ${serverConfig.auth_dbname}.register($1, $2)`, [
      params.username,
      params.password,
    ]).then((res) => {
      regResult = res.rows[0];
      return regResult;
    });
    return Promise.resolve();
  });

  it('can signin', () => {
    return pgPool.query(`select * from ${serverConfig.auth_dbname}.authenticate($1, $2)`, [params.username, params.password])
      .then((res) => {
        const authResult = res.rows[0];
        authResult.success.should.be.true;
        return authResult;
      });
  });

  it('can not signin with invalid password', () => {
    return pgPool.query(`select * from ${serverConfig.auth_dbname}.authenticate($1, $2)`, [params.username, 'invalidpasssword'])
      .then((res) => {
        const authResult = res.rows[0];
        authResult.success.should.be.false;
        return authResult;
      });
  });
});
