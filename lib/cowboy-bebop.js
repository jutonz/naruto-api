var request = require('request');
var cheerio = require('cheerio');

constructJsonFromTR = function constructJsonFromTR(tr) {
  var episodeTitles = tr.find('.summary').text();
  var englishTitle = episodeTitles.split('\n')[0];
  englishTitle = englishTitle.replace(/\"/g, '');

  var originalAirdate = tr.find('td:nth-child(3)').text();

  var englishAirdate = tr.find('td:last-child').text();
  englishAirdate = englishAirdate.replace(/\[\d*\]/, '');
  englishAirdate = englishAirdate.split('\n')[0];

  var table = tr.parent();
  var seasonInfo = table.prev().prev().text();
  var season = '1';

  var seasonYear = seasonInfo.split(': ')[1];
  seasonYear = seasonYear.replace('[edit]', '');
  seasonYear = seasonYear.replace('–', '-');

  var episodeNumber = tr.find('th').text();

  var episodeInfo = {
    episodeNumber: episodeNumber
  , title: englishTitle
  , season: season
  , seasonYear: seasonYear
  , originalAirdate: originalAirdate
  , englishAirdate: englishAirdate
  };

  return JSON.stringify(episodeInfo);
};

exports.getInfoForEpisodeNumber = function(episodeNumber, callback) {
  var options = {
    uri: 'http://en.wikipedia.org/wiki/List_of_Cowboy_Bebop_episodes'
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      $ = cheerio.load(body);
      $('#ep' + episodeNumber).each(function() {
        // console.log('looking for tag: ' + '#ep' + episodeNumber)
        // console.log('this: ' + $(this));
        var tr = $(this).parent();
        // console.log(constructJsonFromTR(tr));
        try {
          var json = constructJsonFromTR(tr);
          callback(json);
        } catch (e) {}
      });
    }
  });
};
