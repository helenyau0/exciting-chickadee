const pgp = require('pg-promise')()
const fs = require('fs')

if(fs.existsSync('.env')) {
  require('dotenv').config()
}
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString)

const Twitter = {
  getAllTweets: () => {
    const psql = `SELECT * FROM twitbot`
    return db.any(psql)
  },
  getOneTweet: (id) => {
    const psql = `SELECT id FROM twitbot`
    return db.one(psql, id)
  },
  addTweets: (tweet) => {
    const psql = `INSERT INTO twitbot(tweets) VALUES($1) RETURNING *`
    return db.any(psql, tweet)
  }
}

module.exports = {
  Twitter
}
