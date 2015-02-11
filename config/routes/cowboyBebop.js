var Joi = require('joi');
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
  , config: {
      validate: {
        params: {
          episodeNumber: Joi.number().integer().min(1).required()
        }
      }
    }
  }
];
