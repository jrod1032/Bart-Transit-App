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
      console.log(err)
      res.sendStatus(500).json({error: 'server error'})
    }
    res.status(200).json(lines);  
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})