const express = require('express');
const router = express.Router();
const Twit = require('twit');
const config = require('./config.js')
const { Twitter } = require('../database/database.js')

router.get('/', function(req, res, next) {
  Twitter.getAllTweets().then((results) => {
    res.send(results)
  })
})

console.log('this bot is running...');

let T = new Twit(config);

let techCrunchSearch = {
  q: "#Technology OR #Tech OR #STEM",
  count: 15,
  result_type: 'recent OR popular'
}

function retweetLatest() {
  T.get('search/tweets', techCrunchSearch, function(error, data) {
    if(!error) {
      let retweetId = data.statuses[0].id_str
      T.post('statuses/retweet/' + retweetId, {}, function(error, response) {
        if(response) {
          console.log('success, twitbot is working');
          Twitter.addTweets(response.text)
        }
        if(error) {
          console.log('there was an error with Twitter: ' + error);
        }
      })
    } else {
        console.log('there was an error with your hashtag search: ' + error);
    }
  })
}

// router.get('/mySecretRoutelol', (req, res) => {
//   T.get('search/tweets', { q:'testingtwitbot', count:10 } , function (error, data) {
//     let arrayOfTweets = []
//       if(data) {
//         let tweets = data.statuses;
//         for(let i = 0; i < tweets.length; i++) {
//           arrayOfTweets.push(tweets[i].text)
//         }
//         Twitter.addTweets(arrayOfTweets)
//         .then( results => {
//           res.send( results )
//         })
//       } else {
//         console.log('there was an error: ' + error);
//       }
//   });
// })

retweetLatest();

setInterval(retweetLatest, 1000*60*30)

module.exports = router;
