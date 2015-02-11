var should = require('chai').should();

before(function() {
  this.server = require('../index');
});

describe('GET /cowboy-bebop/episodes/{episodeNumber}', function() {

  it('should be connectable', function(done) {
    this.timeout(10000);
    var request = { url: '/cowboy-bebop/episodes/', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 404);
      done();
    });
  });

  it('should retrieve info for ep1', function(done) {
    this.timeout(10000);
    var request = { url: '/cowboy-bebop/episodes/1', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);

      var json = JSON.parse(response.payload);
      should.exist(json);
      json.title.should.eq('Asteroid Blues');
      json.episodeNumber.should.eq('1');
      json.originalAirdate.should.eq('October 24, 1998');
      json.englishAirdate.should.eq('September 2, 2001');
      done();
    });
  });

  it('should retrieve info for ep10', function(done) {
    this.timeout(10000);
    var request = { url: '/cowboy-bebop/episodes/10', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);

      var json = JSON.parse(response.payload);
      should.exist(json);
      json.title.should.equal('Ganymede Elegy');
      json.episodeNumber.should.equal('10');
      json.originalAirdate.should.equal('December 26, 1998');
      json.englishAirdate.should.equal('September 30, 2001');
      done();
    });
  });

  it('should only accept episode numbers greater than 0', function(done) {
    this.timeout(10000);
    var request = { url: '/cowboy-bebop/episodes/0', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.statusCode.should.equal(400);
      done();
    });
  });

  it('should only accept integer episode numbers', function(done) {
    this.timeout(10000);
    var request = { url: '/cowboy-bebop/episodes/hithere', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.statusCode.should.equal(400);
      done();
    });
  });

});
