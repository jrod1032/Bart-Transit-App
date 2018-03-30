const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/lines', async (req, res) => {
  try {
    const allLines = await db.getAllLines();
    res.status(200).json(allLines)
  }
  catch (e){
    res.status(500).json({error: e})
  }
})

app.get('/api/lines/:lineId', async (req, res) => {
  const lineId = req.params.lineId;

  try {
    let stations = await db.getAllStopsOnLine(lineId)
    res.status(200).json(stations)
  } catch(e) {
    res.status(500).json({error: e})
  }
})

app.get('/api/stations/', async (req, res) => {
  try {
    const allStations = await db.getAllStations();
    res.status(200).json(allStations)
  }
  catch(e) {
    console.log(e)
  }
  
})

app.get('/api/getDirections', async (req, res) => {
  const endpoints = req.query;
  console.log('endpoints: ', endpoints);
  try {
     let {lineName, lineColor, stations} = await db.getDirections(endpoints);
     console.log('lineName: ',lineName)
     console.log('color: ', lineColor)
     console.log('stations: ',stations)
     res.status(200).json({lineName, lineColor, stations})
  } catch(e){
    console.log(e)
  }
  // let stations = await db.getDirections(endpoints, (err, directions, serviceLine, color) => {
  //   if (err) {
  //     res.status(500).json({error: 'server error'})
  //   } else {
  //     res.status(200).json({directions: directions, line: serviceLine, color: color})
  //   }
  // })
})

app.patch('/api/lines/:lineId', (req, res) => {
  const lineId = req.params.lineId;
  db.updateFavorite(lineId, (err, confirmation) => {
    if (err) {
      res.status(500).json({error: 'server error'})
    } else {
      res.status(201).json({confirmation: 'updated!'})
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})