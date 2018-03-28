const { Client } = require('pg');
const pgConfig = require('./config.js');
const client = new Client(pgConfig)

client.connect()

// const mysql = require('mysql');
// const mysqlConfig = require('./config.js')

// const connection = mysql.createConnection(mysqlConfig)

const getAllLines = function(callback) {
  client.query('SELECT * FROM service_lines', (err, lines) => {
    if (err) {
      console.log('error from db', err)
      callback(err, null)
    } else {
      callback(null, lines)
    }
  })
}

const getAllStopsOnLine = function(lineId, callback) {
  const sqlQuery = `SELECT stations.name, stations.id, stations.is_favorite FROM stations, service_lines INNER JOIN stops ON stops.line_id = service_lines.id WHERE service_lines.id = ${lineId} AND stops.station_id = stations.id`
  client.query(sqlQuery, (err, stations) => {
    if (err) {
      console.log('error from db', err)
      callback(err, null)
    } else {
      callback(null, stations)
    }
  })
}

const getAllStations = function(callback) {
  const sqlQuery = `SELECT stations.name, stations.id, stations.is_favorite FROM stations ORDER BY is_favorite desc`
  client.query(sqlQuery, (err, stations) => {
    if (err) {
      console.log('error from db', err)
      callback(err, null)
    } else {
      callback(null, stations)
    }
  })
}

const updateFavorite = function(lineId, callback) {
  const sqlQuery = `UPDATE stations SET is_favorite = NOT is_favorite WHERE stations.id = ${lineId}`
  client.query(sqlQuery, (err, confirmation) => {
    if (err) {
      console.log('error from db', err)
      callback(err, null)
    } else {
      callback(null, confirmation)
    }
  })
}

const findMatchingLines = function(linesA, linesB) {
  const matchingLines = [];
  for (let i = 0; i < linesA.length; i++) {
    let lineA = linesA[i]
    for (let j = 0; j < linesB.length; j++) {
      let lineB = linesB[j]
      if (lineA.id === lineB.id) {
        matchingLines.push(lineA)
      }
    }
  }
  return matchingLines;
}

const getCommonLines = function(stationId1, stationId2, callback) {
  const sqlQuery = `SELECT * FROM 
  (SELECT stops.line_id, service_lines.name FROM stops, service_lines WHERE stops.station_id = ${stationId1} AND service_lines.id = stops.line_id
  INTERSECT 
  SELECT stops.line_id, service_lines.name FROM stops, service_lines WHERE stops.station_id = ${stationId2} AND service_lines.id = stops.line_id) 
  AS commonlines`
  client.query(sqlQuery, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data.rows)
    }
  })
}

const getDirections = function(endpoints, callback) {
  getCommonLines(endpoints.start, endpoints.end, (err, commonLines) => {
    if (err) {console.log(err.message)}
      console.log('common lines, ', commonLines)
      if (commonLines.length > 0) {
        getAllStopsOnLine(commonLines[0].line_id, (err, data) => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, data.rows)
          }
        }) 
      } else {
        //find transfer points, go from there
      }
  })

}

module.exports.getAllLines = getAllLines;
module.exports.getAllStopsOnLine = getAllStopsOnLine;
module.exports.getAllStations = getAllStations;
module.exports.updateFavorite = updateFavorite;
module.exports.getDirections = getDirections;