var Joi = require('joi');
var naruto = require('../../lib/naruto');

module.exports = [
  {
    method: 'GET'
  , path: '/naruto-shippuden/episodes/{episodeNumber}'
  , handler: function(request, reply) {
      var episodeNumber = encodeURIComponent(request.params.episodeNumber);
      naruto.getInfoForEpisodeNumber(episodeNumber, function(info) {
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
, {
    method: 'GET'
  , path: '/naruto-shippuden/seasons/{seasonNumber}'
  , handler: function(request, reply) {
      var seasonNumber = encodeURIComponent(request.params.seasonNumber);
      naruto.getInfoForSeasonNumber(seasonNumber, function(info) {
        reply(info);
      });
    }
  , config: {
      validate: {
        params: {
          seasonNumber: Joi.number().integer().min(1).required()
        }
      }
    }
  }
];
