const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/lines', (req, res) => {
  db.getAllLines( (err, lines) => {
    if (err){
      res.status(500).json({error: 'server error'})
    } else {
      res.status(200).json(lines.rows);  
    }
  })
})

app.get('/api/lines/:lineId', (req, res) => {
  const lineId = req.params.lineId;
  db.getAllStopsOnLine(lineId, (err, stations) => {
    if (err) {
      res.status(500).json({error: 'server error'})
    } else {
      res.status(200).json(stations.rows)
    }
  })
})

app.get('/api/stations/', (req, res) => {
  db.getAllStations( (err, stations) => {
    if (err) {
      res.status(500).json({error: 'server error'})
    } else {
      res.status(200).json(stations.rows)
    }
  })
})

app.get('/api/getDirections', (req, res) => {
  const endpoints = req.query;
  console.log('endpoints: ', endpoints);
  db.getDirections(endpoints, (err, directions) => {
    if (err) {
      res.status(500).json({error: 'server error'})
    } else {
      res.status(200).json(directions)
    }
  })
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