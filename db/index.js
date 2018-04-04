const { Client } = require('pg');
const pgp = require('pg-promise')();
const pgConfig = require('./config.js');
const helpers = require('./helpers.js')
const client = pgp(pgConfig);

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
  const sqlQuery = `SELECT stations.name, stations.id, stations.is_favorite, stops.is_transfer
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
  const sqlQuery = `SELECT stops.line_id, service_lines.name, service_lines.color 
  FROM stops, service_lines 
  WHERE stops.station_id = ${stationId} 
  AND service_lines.id = stops.line_id
  ORDER BY service_lines.id desc`
  try {
    const lines = await client.any(sqlQuery, [true]);
    return lines
  }
  catch(e) {
    //error
    console.log('error', e)
  }
}


const getDirections = async function(endpoints) {
  let combinedDirections = [];

  const generateDirections = async function(endpoints) {
    const start = parseInt(endpoints.start);
    const end = parseInt(endpoints.end);
    const lines = await getLinesThatStopBelongsTo(start);
    const lines2 = await getLinesThatStopBelongsTo(end);
    const commonLines = helpers.getCommonLines(lines,lines2);

    if (commonLines.length > 0) {
      for (let i = 0; i < commonLines.length; i++) {
        let lineId = commonLines[i].line_id;
        let lineName = commonLines[i].name;
        let lineColor = commonLines[i].color;
        let allStationsOnLine = await getAllStopsOnLine(lineId);
        let stations = helpers.getStationsUntilEndPoint(start, end, allStationsOnLine)
        if (stations.length > 0) {
          let dir = {};
          dir.lineName = lineName;
          dir.lineColor = lineColor;
          dir.stations = stations;
          combinedDirections.push(dir) 
          break;
        } 
      }

    } else {
    //no common lines, need transfer
        for (let i = 0; i < lines.length; i++) {
          let lineId1 = lines[i].line_id;
          let lineName1 = lines[i].name;
          let lineColor1 = lines[i].color;
          let lineId2 = lines2[i].line_id;
          let allStationsOnLine1 = await getAllStopsOnLine(lineId1);
          let allStationsOnLine2 = await getAllStopsOnLine(lineId2);  
        //get stations up until transfer point;
          let stations1 = helpers.getStationsUntilTransferPoint(allStationsOnLine1, start);  
          if (stations1.length > 0) {
            let directions = {lineName: lineName1, lineColor: lineColor1, stations: stations1}
            combinedDirections.push(directions)

            let transferStation = stations1[stations1.length - 1]
            let newEndpoints = {start: transferStation.id, end: end }
            let generate = await generateDirections(newEndpoints)
            break;
          }  
        }
    }

  }

  let generate = await generateDirections(endpoints)
  return combinedDirections;
}


module.exports.getAllLines = getAllLines;
module.exports.getAllStopsOnLine = getAllStopsOnLine;
module.exports.getAllStations = getAllStations;
module.exports.updateFavorite = updateFavorite;
module.exports.getDirections = getDirections;