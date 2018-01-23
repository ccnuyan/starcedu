import '../../../db/testHelpers';

import pgPool from '../../../db/connector';

const params = {
  username: 'testnewuser',
  password: 'password',
};

describe('registration', () => {
  describe('with valid creds', () => {
    let regResult = null;
    before(async () => {
      await pgPool.query(`delete from ${serverConfig.auth_dbname}.users where username=$1`, [params.username]);
      return pgPool.query(`select * from ${serverConfig.auth_dbname}.register($1, $2)`, [
        params.username,
        params.password,
      ]).then((res) => {
        regResult = res.rows[0];
        return regResult;
      });
    });
    it('is successful', () => {
      regResult.success.should.be.true;
    });
    it('returns a new id', () => {
      regResult.id.should.not.be.null;
    });
    it('return a role', () => {
      regResult.role.should.equal(-1);
    });
    it('returns correct username', () => {
      regResult.username.should.equal(params.username);
    });
  });
  describe('trying an existing user', () => {
    let regResult = null;
    before(async () => {
      return pgPool.query(`select * from ${serverConfig.auth_dbname}.register($1, $2)`, [
        params.username,
        params.password,
      ]).then((res) => {
        regResult = res.rows[0];
        return regResult;
      });
    });
    it('is not successful', () => {
      regResult.success.should.be.false;
    });
  });
});
