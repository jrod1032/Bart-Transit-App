const { Client } = require('pg');
const pgp = require('pg-promise')();
const pgConfig = require('./config.js');
//const client = new Client(pgConfig)
const client = pgp(pgConfig);
//client.connect()

const getAllLines = async function() {
  try {
    let allLines = await client.any('SELECT * FROM service_lines', [true]);
    return allLines;
  }
  catch(e) {
    console.log(err)
  }
}


const getAllStopsOnLine = async function(lineId) {
  const sqlQuery = `SELECT stations.name, stations.id, stations.is_favorite 
  FROM stations, service_lines 
  INNER JOIN stops 
  ON stops.line_id = service_lines.id 
  WHERE service_lines.id = ${lineId} 
  AND stops.station_id = stations.id
  ORDER BY stops.id asc`
  try {
    const stations = await client.any(sqlQuery, [true])
    return stations;
  } 
  catch(e) {
    console.log('error getting stations', e)
  }
}

const getAllStations = async function() {
  const sqlQuery = `SELECT stations.name, stations.id, stations.is_favorite 
  FROM stations 
  ORDER BY is_favorite desc`
  try {
    let allStations = await client.any(sqlQuery, [true])
    console.log('all stations!!', allStations)
    return allStations;
  }
  catch(e) {
    console.log(e)
  }
}

const updateFavorite = function(lineId, callback) {
  const sqlQuery = `UPDATE stations SET is_favorite = NOT is_favorite WHERE stations.id = ${lineId}`
  try {
    let confirmation = client.none(sqlQuery)
  } catch(e) {
    console.log('error on update', e)
  }
}

const getLinesThatStopBelongsTo = async function(stationId, callback) {
  const sqlQuery = `SELECT stops.line_id, service_lines.name, service_lines.color FROM stops, service_lines WHERE stops.station_id = ${stationId} AND service_lines.id = stops.line_id`
  try {
    const lines = await client.any(sqlQuery, [true]);
    return lines
  }
  catch(e) {
    //error
    console.log('error', e)
  }
}


const getDirections = async function(endpoints, callback) {
  const start = parseInt(endpoints.start);
  const end = parseInt(endpoints.end);
  const lines = await getLinesThatStopBelongsTo(start);
  console.log('lines!', lines)
  for (let i = 0; i < lines.length; i++) {
    let lineId = lines[i].line_id;
    let lineName = lines[i].name;
    let lineColor = lines[i].color;
    let allStationsOnLine = await getAllStopsOnLine(lineId);

    let stations = findStationsinCorrectDirection(start, end, allStationsOnLine)
    if (stations.length > 0) {
      return {lineName, lineColor, stations}
    }
  }
}

const findStationsinCorrectDirection = function(start, end, stations) {
  let startIndex = -1;
  let endIndex = -1;
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i]
    if (station.id === start) {
      startIndex = i
    } else if (stations[i].id === end) {
      endIndex = i
    }
    if (startIndex > -1 && endIndex > -1) {
      break;
    }
  }
  if (endIndex > 0 && startIndex <= endIndex) {
    return stations.slice(startIndex, endIndex + 1);
  } else if (endIndex > 0 && startIndex > endIndex){
    return stations.slice(startIndex, endIndex + 1).reverse();
  } else {
    return [];
  }
}

module.exports.getAllLines = getAllLines;
module.exports.getAllStopsOnLine = getAllStopsOnLine;
module.exports.getAllStations = getAllStations;
module.exports.updateFavorite = updateFavorite;
module.exports.getDirections = getDirections;