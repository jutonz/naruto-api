var Hapi = require('hapi');
var Good = require('good');
var request = require('request');
var naruto = require('./lib/naruto');

var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT) || 8000
});

server.route({
  method: 'GET'
, path: '/'
, handler: function(request, reply) {
    reply();
  }
});

server.route({
  method: 'GET'
, path: '/naruto-shippuden/episodes/{episodeNumber}'
, handler: function(request, reply) {
    var episodeNumber = encodeURIComponent(request.params.episodeNumber);
    naruto.getInfoForEpisodeNumber(episodeNumber, function(info) {
      reply(info);
    });
  }
});

server.route({
  method: 'GET'
, path: '/naruto-shippuden/seasons/{seasonNumber}'
, handler: function(request, reply) {
    var seasonNumber = encodeURIComponent(request.params.seasonNumber);
    naruto.getInfoForSeasonNumber(seasonNumber, function(info) {
      reply(info);
    });
  }
});

var usingGood = {
  register: Good
, options: {
    reporters: [{
      reporter: require('good-console')
    , args:[{ log: '*', response: '*' }]
    }]
  }
};

if (!module.parent) { // Don't start server if testing
  server.register(usingGood, function(error) {
      if (error) { throw error; } // Problem loading Good plugin
      server.start(function() {
        server.log('info', 'Server running at: ' + server.info.uri);
      });
    }
  );
}

module.exports = server;
