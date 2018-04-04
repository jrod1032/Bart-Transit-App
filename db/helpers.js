const getCommonLines = function(lines1, lines2) {
  let commonLines = []
  for (let i = 0; i < lines1.length; i++) {
    for (let j = 0; j < lines2.length; j++) {
      if (lines1[i].line_id === lines2[j].line_id) {
        commonLines.push(lines1[i]);
      }
    }
  }
  return commonLines;
}

const getStationsUntilEndPoint = function(startId, endId, stations, property) {
  let startIndex = -1;
  let endIndex = -1;
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i]
    if (station.id === startId) {
      startIndex = i
    } else if (station.id === endId) {
      endIndex = i
    }
    if (startIndex > -1 && endIndex > -1) {
      break;
    }
  }

  if (endIndex > 0 && startIndex <= endIndex) {
    return stations.slice(startIndex, endIndex + 1);
  } else {
    return [];
  }
}

const getStationsUntilTransferPoint = function(stations, startId) {
  let startIndex = -1
  let transferIndex = -1;
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i]
    if (station.id === startId) {
      startIndex = i
    } else if (station.is_transfer) {
      transferIndex = i 
    }
    if (startIndex > -1 && transferIndex > -1) {
      break;
    }
  }
  console.log('start', startIndex)
  console.log('transfer', transferIndex)

  if (transferIndex > 0 && startIndex <= transferIndex) {
    return stations.slice(startIndex, transferIndex + 1)
  } else {
    return [];
  }
}

module.exports.getCommonLines = getCommonLines;
module.exports.getStationsUntilEndPoint = getStationsUntilEndPoint;
module.exports.getStationsUntilTransferPoint = getStationsUntilTransferPoint;