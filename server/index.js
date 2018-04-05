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
  try {
     let combinedDirections = await db.getDirections(endpoints);

     res.status(200).json(combinedDirections)
  } catch(e){
    console.log(e)
  }

})

app.patch('/api/lines/:lineId', async (req, res) => {
  const lineId = req.params.lineId;
  try {
    const confirmation = await db.updateFavorite(lineId)
    res.status(201).json(confirmation);
  }
  catch(e) {
    res.status(500).json(e)
  }

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})