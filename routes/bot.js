// var express = require('express');
// var Twit = require('twit');
// var config = require('./config.js')
//
// console.log('this bot is running...');
//
// var T = new Twit(config);
//
// var techCrunchSearch = {
//   q: "#technology OR #tech OR #STEM",
//   count: 15,
//   result_type: 'recent OR popular'
// }
//
// function retweetLatest() {
//   T.get('search/tweets', techCrunchSearch, function(err, data) {
//     let memberIDs = []
//     if(!err) {
//       var retweetId = data.statuses[0].id_str
//
//       T.post('statuses/retweet/' + retweetId, {}, function(error, response) {
//         if(response) {
//           console.log('success, twitbot is working');
//         } else if(data && memberIDs) {
//           var id = {
//             id: data.statuses[0].id_str
//           }
//         } if(error) {
//           console.log('there was an error with Twitter: ' + error);
//         }
//       })
//     }
//     else {
//       console.log('there was an error with your hashtag search: ' + error);
//     }
//   })
// }
//
// retweetLatest();
//
// setInterval(retweetLatest, 1000*20)
