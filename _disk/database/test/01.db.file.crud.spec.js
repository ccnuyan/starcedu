import '../../../utils/testHelpers';
import serverConfig from '../../../serverConfig';
import pgPool from '../../../db/connector';

const userid = '12345678';

const fakeCallback = {
  etag: '123',
  mime: '456',
  size: 789,
};

const file = {
  filename: 'file.txt',
};

describe('db file crud', function () { // eslint-disable-line
  beforeEach(async () => {
    await pgPool.query(`delete from ${serverConfig.disk_dbname}.files`);
    return pgPool.query(`select * from ${serverConfig.disk_dbname}.create_file($1, $2)`, [
      userid,
      file.filename,
    ]).then((res) => {
      this.fileInfo = res.rows[0];
      return res;
    });
  });

  it('can create a file', () => {
    this.fileInfo.success.should.be.true;
    this.fileInfo.filename.should.equals(file.filename);
  });

  describe('after file created', () => {
    beforeEach(async () => {
      return pgPool.query(`select * from ${serverConfig.disk_dbname}.require_file($1)`, [this.fileInfo.id])
        .then((res) => {
          this.requiredFileInfo = res.rows[0];
          return res;
        });
    });
    it('can require the created file', () => {
      return pgPool.query(`select * from ${serverConfig.disk_dbname}.require_file($1)`, [this.fileInfo.id])
        .then((res) => {
          this.requiredFileInfo = res.rows[0];
          this.requiredFileInfo.success.should.be.true;
          this.fileInfo.id.should.equals(this.requiredFileInfo.id);
          this.fileInfo.filename.should.equals(this.requiredFileInfo.filename);
        });
    });

    it('can update created file title', () => {
      return pgPool.query(`select * from ${serverConfig.disk_dbname}.update_file_title($1, $2, $3)`, [
        userid,
        this.fileInfo.id,
        `${file.filename}new`,
      ])
        .then((res) => {
          this.updatedFileInfo = res.rows[0];
          this.updatedFileInfo.success.should.be.true;
          this.updatedFileInfo.id.should.equals(this.requiredFileInfo.id);
          this.updatedFileInfo.filename.should.equals(this.requiredFileInfo.filename);
        });
    });

    it('can update created file status', () => {
      return pgPool.query(`select * from ${serverConfig.disk_dbname}.update_file_status($1, $2, $3, $4)`, [
        this.fileInfo.id,
        fakeCallback.etag, fakeCallback.mime, fakeCallback.size,
      ]).then((res) => {
        this.statusUpdatedFileInfo = res.rows[0];
        this.statusUpdatedFileInfo.success.should.be.true;
        this.statusUpdatedFileInfo.id.should.equals(this.fileInfo.id);
      });
    });

    it('can remove created file', () => {
      return pgPool.query(`select * from ${serverConfig.disk_dbname}.delete_file($1, $2)`, [
        userid,
        this.fileInfo.id,
      ]).then((res) => {
        this.removedFileInfo = res.rows[0];
        this.removedFileInfo.success.should.be.true;
        this.removedFileInfo.id.should.equals(this.fileInfo.id);
      });
    });

    describe('after file removed', () => {
      beforeEach(async () => {
        return pgPool.query(`select * from ${serverConfig.disk_dbname}.delete_file($1, $2)`, [
          userid,
          this.fileInfo.id,
        ]);
      });
      it('can not retrieve the file', () => {
        return pgPool.query(`select * from ${serverConfig.disk_dbname}.require_file($1)`, [this.fileInfo.id]).then((res) => {
          this.requiredAgainFileInfo = res.rows[0];
          this.requiredAgainFileInfo.success.should.be.false;
          return res;
        });
      });
    });
  });
});
