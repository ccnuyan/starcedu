import serverConfig from '../../../serverConfig';
import '../../../utils/testHelpers';
import pgPool from '../../../db/connector';

const params = {
  username: 'testnewuser',
  password: 'password',
};

describe('db user registration', () => {
  let regResult = null;
  beforeEach(async () => {
    await pgPool.query(`delete from ${serverConfig.auth_dbname}.users`);
    return pgPool.query(`select * from ${serverConfig.auth_dbname}.register($1, $2)`, [
      params.username,
      params.password,
    ]).then((res) => {
      regResult = res.rows[0];
      return regResult;
    });
  });
  it('can return with success true', () => {
    regResult.success.should.be.true;
  });
  it('can return a new id', () => {
    regResult.id.should.not.be.null;
  });
  it('can return a role', () => {
    regResult.role.should.equal(-1);
  });
  it('can return correct username', () => {
    regResult.username.should.equal(params.username);
  });
  describe('trying an existing user', () => {
    beforeEach(async () => {
      return pgPool.query(`select * from ${serverConfig.auth_dbname}.register($1, $2)`, [
        params.username,
        params.password,
      ]).then((res) => {
        regResult = res.rows[0];
        return regResult;
      });
    });
    it('can not be ok', () => {
      regResult.success.should.be.false;
    });
  });
});
