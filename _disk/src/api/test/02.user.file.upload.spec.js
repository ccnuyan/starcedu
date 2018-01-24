import userServices from '../../../../_auth/src/services/userServices';
import serverConfig from '../../../../serverConfig';
import '../../../../utils/testHelpers';
import pgPool from '../../../../db/connector';
import app from '../../../';

const callbackbody = {
  etag: 'abcdefg',
  mime: 'text/html',
  size: 123,
};

describe('user upload file', function () { // eslint-disable-line
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

  it('can get empty list because the file has not been uploaded', () => {
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

  it('can get the updated file after callback', () => {
    return chai.request(app)
      .post('/api/files/upload_callback')
      .send({
        id: this.fileUploaded.id,
        ...callbackbody,
      })
      .then((res1) => {
        res1.should.have.status(200);
        res1.body.should.be.a('object');
        res1.body.filename.should.equals(this.filename);
      });
  });

  it('can getwhen request to create a remote file', () => {
    return chai.request(app)
      .post('/api/tenant/files/remote')
      .set(serverConfig.userHeader, `bearer ${this.user.token}`)
      .send({
        filename: 'ccnu.jpg',
        file_url: 'http://www.ccnu.edu.cn/__local/9/BE/1E/227D99AC5071495B37D18A7A181_99628090_1363C.jpg',
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        return res;
      });
  });

  describe('after callback', () => {
    beforeEach(async () => {
      return chai.request(app)
      .post('/api/files/upload_callback')
      .send({
        id: this.fileUploaded.id,
        ...callbackbody,
      });
    });
    it('can getturn empty list', () => {
      return chai.request(app)
        .get('/api/tenant/files/uploaded')
        .set(serverConfig.userHeader, `bearer ${this.user.token}`)
        .then((res2) => {
          res2.should.have.status(200);
          res2.body.should.be.a('object');
          res2.body.message.should.equal('files get');
          res2.body.data.should.be.an('array').have.length(1);
          return res2;
        });
    });

    it('can get the updated file with updated status', () => {
      return chai.request(app)
        .get(`/api/tenant/files?file_id=${this.fileUploaded.id}`)
        .set(serverConfig.userHeader, `bearer ${this.user.token}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          return res;
        });
    });
  });
});
