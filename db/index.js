const { Client } = require('pg');
const pgConfig = require('./config.js');
const client = new Client(pgConfig)

client.connect()

const getAllLines = function(callback) {
  client.query('SELECT name FROM service_lines', (err, lines) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, err)
    }
  })
}

module.exports.getAllLines = getAllLines;