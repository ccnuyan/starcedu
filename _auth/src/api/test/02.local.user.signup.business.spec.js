import './testHelpers';
import pgPool from '../../../database/connector';
import app from '../../../server';

describe('local user signup business', function () { // eslint-disable-line
  this.timeout(10000);
  beforeEach(async () => {
    await pgPool.query('delete from starcedu_auth.logins'); // eslint-disable-line
    await pgPool.query('delete from starcedu_auth.users'); // eslint-disable-line
    await pgPool.query('delete from starcedu_auth.oauth2users'); // eslint-disable-line

    this.user = {
      username: 'user@test.com',
      password: 'testpass',
    };

    this.userWithSameUseranme = {
      username: 'user@test.com',
      password: '123456',
    };

    this.new_pass = 'newpass';

    return chai.request.agent(app)
      .post('/api/local/user/signup')
      .send(this.user)
      .then((res) => {
        res.should.have.status(200);
        res.should.have.cookie('connect.sid');
        return res;
      });
  });

  it('can not signup with same username', () => {
    return chai.request(app)
      .post('/api/local/user/signup')
      .send(this.userWithSameUseranme)
      .then(null, (err) => {
        err.should.have.status(400);
        err.response.body.message.should.equal('user with this username already existed');
      });
  });

  it('can not signup without password', () => {
    return chai.request(app)
      .post('/api/local/user/signup')
      .send({
        username: 'justusername',
      })
      .then(null, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('password empty');
        return err.response;
      });
  });

  it('can not signup without username', () => {
    return chai.request(app)
      .post('/api/local/user/signup')
      .send({
        password: 'justpassword',
      })
      .then(null, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('username empty');
        return err.response;
      });
  });

  it('can not signup with illigal username', () => {
    return chai.request(app)
      .post('/api/local/user/signup')
      .send({
        username: 'testpass',
        password: 'testpass',
      })
      .then(null, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('provided username illigal');
        return err.response;
      });
  });

  it('can not signup with illigal password', () => {
    return chai.request(app)
      .post('/api/local/user/signup')
      .send({
        username: 'naerns@nae.nbc',
        password: '?*na_',
      })
      .then(null, (err) => {
        err.response.should.have.status(400);
        err.response.body.message.should.equal('provided password illigal');
        return err;
      });
  });
});
