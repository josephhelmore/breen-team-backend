const db = require('../connection');

const seed = ({ userData, scoreData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users, scores;`)
    .then(() => {
      return db.query(
        `CREATE TABLE users (
        user_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(20) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE scores (
        score_id SERIAL PRIMARY KEY NOT NULL,
        score INT NOT NULL, 
        user_id INT NOT NULL REFERENCES  users(user_id),
        username VARCHAR(20) NOT NULL REFERENCES users(username),
        game_id INT NOT NULL REFERENCES games(game_id),
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE games (
           game_id SERIAL PRIMARY KEY NOT NULL,
           name VARCHAR(20) NOT NULL,       
            );`
      );
    });
};

module.exports = seed;
