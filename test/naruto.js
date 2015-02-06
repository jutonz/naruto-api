var should = require('chai').should();

before(function() {
  this.timeout(5000);
  this.server = require('../index');
  // this.server.connection({ host: 'test' });
});

describe('GET /naruto-shippuden/episodes/{episodeNumber}', function() {

  it('should be connectable', function(done) {
    var request = { url: '/naruto-shippuden/episodes/', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 404);
      done();
    });
  });

  it('should retrieve info for ep1', function(done) {
    var request = { url: '/naruto-shippuden/episodes/1', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);

      var json = JSON.parse(response.payload);
      should.exist(json);
      json.title.should.eq('Homecoming');
      json.episodeNumber.should.equal('1');
      json.season.should.eq('1');
      json.seasonYear.should.eq('2007');
      json.originalAirdate.should.eq('February 15, 2007');
      json.englishAirdate.should.eq('October 28, 2009');
      done();
    });
  });

  it('should retrieve info for ep10', function(done) {
    var request = { url: '/naruto-shippuden/episodes/10', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);

      var json = JSON.parse(response.payload);
      should.exist(json);
      json.title.should.equal('Sealing Jutsu: Nine Phantom Dragons');
      json.episodeNumber.should.equal('10');
      json.season.should.equal('1');
      json.seasonYear.should.equal('2007');
      json.originalAirdate.should.equal('April 19, 2007');
      json.englishAirdate.should.equal('December 16, 2009');
      done();
    });
  });

  it('should retrieve info for ep100', function(done) {
    var request = { url: '/naruto-shippuden/episodes/100', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);

      var json = JSON.parse(response.payload);
      should.exist(json);
      json.title.should.equal('Inside the Mist');
      json.episodeNumber.should.equal('100');
      json.season.should.equal('5');
      json.seasonYear.should.equal('2008-2009');
      json.originalAirdate.should.equal('March 12, 2009');
      json.englishAirdate.should.equal('December 29, 2012');
      done();
    });
  });

});

describe('GET /naruto-shippuden/seasons/{seasonNumber}', function() {

  it('should retrieve info for season 7', function(done) {
    var request = { url: '/naruto-shippuden/seasons/7', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.statusCode.should.equal(200);

      var json = JSON.parse(response.payload);
      json.length.should.equal(8);

      json[0].episodeNumber.should.equal('144');
      json[0].title.should.equal('Wanderer');
      json[0].originalAirdate.should.equal('January 21, 2010');

      json[4].title.should.equal('Heir to Darkness');

      json[7].episodeNumber.should.equal('151');
      json[7].title.should.equal('Master and Student');
      done();
    });
  });

  it('should retrieve info for season 10', function(done) {
    var request = { url: '/naruto-shippuden/seasons/10', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.statusCode.should.equal(200);

      var json = JSON.parse(response.payload);
      json.length.should.equal(25);

      json[0].episodeNumber.should.equal('197');
      json[0].title.should.equal('The Sixth Hokage Danzo');
      json[0].originalAirdate.should.equal('February 10, 2011');

      json[8].title.should.equal('Declaration of War');

      json[24].episodeNumber.should.equal('221');
      json[24].title.should.equal('Storage');
      done();
    });
  });

});
