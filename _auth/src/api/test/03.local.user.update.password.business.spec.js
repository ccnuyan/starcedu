import '../../../../utils/testHelpers';
import pgPool from '../../../../db/connector';
import app from '../../../';

describe('local user update password business', function () { // eslint-disable-line
  this.timeout(10000);
  beforeEach(async () => {
    await pgPool.query('delete from starcedu_auth.users');
    await pgPool.query('delete from starcedu_auth.logins');
    await pgPool.query('delete from starcedu_auth.oauth2users');

    this.user = {
      username: 'user@test.com',
      password: 'testpass',
    };
    this.new_pass = 'newpass';

    this.agent = chai.request.agent(app);
    await this.agent
      .post('/api/local/user/signup')
      .send(this.user)
      .then((res) => {
        res.should.have.status(200);
        res.should.have.cookie('connect.sid');
      });
    return Promise.resolve();
  });

  it('can update password', async () => {
    return this.agent.put('/api/local/user/update_password')
      .send({
        old_password: this.user.password,
        new_password: this.new_pass,
      })
      .then((res) => {
        res.should.have.status(200);
        res.should.not.have.cookie('connect.sid');
      });
  });

  it('can not update if wrong old password is provided', async () => {
    return this.agent.put('/api/local/user/update_password')
      .send({
        old_password: 'wrongpass',
        new_password: this.new_pass,
      })
      .then((res) => {
        res.should.not.be.ok;
      }, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('credentials invalid');
      });
  });

  it('can not update if no old password is provided', async () => {
    return this.agent.put('/api/local/user/update_password')
      .send({
        new_password: this.new_pass,
      })
      .then((res) => {
        res.should.not.be.ok;
      }, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('old_password empty');
      });
  });

  it('can not update if invalid new password is provided', async () => {
    return this.agent.put('/api/local/user/update_password')
      .send({
        old_password: this.user.password,
        new_password: '1 3 5 7 9',
      })
      .then((res) => {
        res.should.not.be.ok;
      }, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('provided new_password illigal');
      });
  });
});
