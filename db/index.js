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

const gatherStopsOnLine = function(linesForStartpoint, linesForEndpoint, callback) {
  //if matching lines no transfer needed, so just go from start to finish
  console.log('linesStart: ', linesForStartpoint);
  console.log('linesEnd: ', linesForEndpoint);
  const matchingLines = findMatchingLines(linesForStartpoint, linesForEndpoint) 
  console.log('match?', matchingLines)
  if (matchingLines) {
    //we have an array of matching lines
    // for each line, get all stop
    for (let i = 0; i < matchingLines.length; i++) {
      getAllStopsOnLine(matchingLines[i], (err, stations) => {

      })
    }
  } else {
    //harder algorithm
  }
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

const getLineThatStopBelongsTo = function(stationId, callback) {
  const sqlQuery = `SELECT service_lines.id, service_lines.name FROM service_lines, stations INNER JOIN stops ON stops.station_id = stations.id  WHERE stops.line_id = service_lines.id AND stations.id = ${stationId}`
  client.query(sqlQuery, (err, lines) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, lines.rows)
    }
  })
}

const getDirections = function(endpoints, callback) {
  getLineThatStopBelongsTo(endpoints.start, (err1, linesForStartpoint) => {
    getLineThatStopBelongsTo(endpoints.end, (err2, linesForEndpoint) => {
      if(err2) {console.log(err.message)}
      gatherStopsOnLine(linesForStartpoint, linesForEndpoint, (stations) => {
        
      })
    })
  })
}

module.exports.getAllLines = getAllLines;
module.exports.getAllStopsOnLine = getAllStopsOnLine;
module.exports.getAllStations = getAllStations;
module.exports.updateFavorite = updateFavorite;
module.exports.getDirections = getDirections;