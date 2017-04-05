var express = require('express');
var router = express.Router();
var Twit = require('twit');
var config = require('./config.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


console.log('this bot is running...');

var T = new Twit(config);

var techCrunchSearch = {
  q: "#Technology OR #TechNEWS OR #STEM",
  count: 15,
  result_type: 'recent OR popular'
}

function retweetLatest() {
  T.get('search/tweets', techCrunchSearch, function(err, data) {
    if(!err) {
      var retweetId = data.statuses[0].id_str

      T.post('statuses/retweet/' + retweetId, {}, function(error, response) {
        if(response) {
          console.log('success, twitbot is working');
        } else if(data && memberIDs) {
          var id = {
            id: data.statuses[0].id_str
          }
        } if(error) {
          console.log('there was an error with Twitter: ' + error);
        }
      })
    }
    else {
      console.log('there was an error with your hashtag search: ' + error);
    }
  })
}

retweetLatest();

setInterval(retweetLatest, 1000*60*30)

module.exports = router;
