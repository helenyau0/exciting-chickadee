const express = require('express');
const router = express.Router();
const Twit = require('twit');
const config = require('./config.js')
const { Twitter } = require('../database/database.js')

router.get('/', function(req, res, next) {
  Twitter.getAllTweets().then((results) => {
    res.render('index', {results})
  })
})

const T = new Twit(config);

let search = {
  q: "#Technology OR #Tech OR #STEM",
  count: 15,
  result_type: 'popular OR recent'
}

retweetLatest = () => {
  T.get('search/tweets', search, (error, data) => {
    if(!error) {
      let retweetId = data.statuses[0].id_str
      T.post('statuses/retweet/' + retweetId, {}, (error, response) => {
        if(response) {
          console.log('Success, twitbot is working');
          Twitter.addTweets(response.text)
        }
        if(error) {
          console.log('There was an error with Twitter: ' + error);
        }
      })
    } else {
        console.log('There was an error with your hashtag search: ' + error);
    }
  })
}

router.get('/tweets/:id', function(req, res) {
  T.post('statuses/update', {status: req.query.status}, (error, response) => {
    if(response) {
      console.log('Success, it worked!');
      Twitter.addTweets(response.text)
    } else {
      console.log('errorrrrrrr.... ', + error);
    }
  })
})

retweetLatest();

setInterval(retweetLatest, 1000*10)



module.exports = router;
