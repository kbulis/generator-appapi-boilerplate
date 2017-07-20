var conf = require('../src/api/configs');

let chai = require('chai');
let http = require('chai-http');

chai.config.showDiff = false;

chai.use(http);

chai.expect(conf.api.development, 'configuration lacks required host').to.have.own.property('host');
chai.expect(conf.api.development, 'configuration lacks required port').to.have.own.property('port');

let endp = 'http://' + conf.api.development.host + ':' + conf.api.development.port;

describe('api', function() {
  it('accesses healthcheck and confirms api handling requests', function(done) {
    chai.request(endp)
      .get('/healthcheck')
      .end(function(err, res) {
        chai.expect(res, 'api seems to be rejecting normal requests')
          .to.have.own.property('status').to.equal(200);

        done();
    });
  });
});