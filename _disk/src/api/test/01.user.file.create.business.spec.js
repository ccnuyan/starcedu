import userServices from '../../../../_auth/src/services/userServices';
import serverConfig from '../../../../serverConfig';
import '../../../../utils/testHelpers';
import pgPool from '../../../../db/connector';
import app from '../../../';

describe('user create file', function () { // eslint-disable-line
  this.timeout(2000);
  this.filename = 'filename';

  beforeEach(async () => {
    const userCredential = {
      username: 'test@user.com',
      password: 'testpass',
    };
    await pgPool.query(`delete from ${serverConfig.auth_dbname}.users`);
    await pgPool.query(`delete from ${serverConfig.disk_dbname}.files`);
    this.user = await userServices.register(userCredential, { gen_token: true, target_tenant: 'local_test_tenant' });
    return Promise.resolve();
  });

  it('can return empty list at beginning', () => {
    return chai.request(app)
      .get('/api/tenant/files/uploaded')
      .set(serverConfig.userHeader, `bearer ${this.user.token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('files get');
        res.body.data.should.be.an('array').have.length(0);
        return res;
      });
  });

  it('can not create file if no filename provided', () => {
    return chai.request(app)
      .post('/api/tenant/files')
      .set(serverConfig.userHeader, `bearer ${this.user.token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        return res;
      });
  });

  it('can create file', () => {
    return chai.request(app)
      .post('/api/tenant/files')
      .set(serverConfig.userHeader, `bearer ${this.user.token}`)
      .send({ filename: this.filename })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.filename.should.equal(this.filename);
        res.body.data.token.should.exist;

        this.fileUploaded = res.body.data;
        return res;
      });
  });
});
