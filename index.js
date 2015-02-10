var Hapi = require('hapi');
var Good = require('good');
var request = require('request');
var routes = require('./config/routes');

var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT) || 8000
});

server.route(routes);

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
