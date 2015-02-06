var should = require('chai').should();

before(function(done) {
  this.timeout(5000);
  this.server = require('../index');
  this.server.connection({ host: 'test' });
  done();
});

describe('GET /', function() {

  it('should be connectable', function(done) {
    var request = { url: '/', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      done();
    });
  });

});
