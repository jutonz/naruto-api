var cowboyBebop = require('../../lib/cowboy-bebop');

module.exports = [
  {
    method: 'GET'
  , path: '/cowboy-bebop/episodes/{episodeNumber}'
  , handler: function(request, reply) {
      var episodeNumber = encodeURIComponent(request.params.episodeNumber);
      cowboyBebop.getInfoForEpisodeNumber(episodeNumber, function(info) {
        reply(info);
      });
    }
  }
];
