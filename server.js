var express = require('express');
var app = express();
// var BreweryDb = require('brewerydb-node');
// var brewdb = new BreweryDb('your-key-here');
var bodyParser = require('body-parser');

app.use(express.static('public'))

// app.use(bodyParser.json());

// app.get('/api/beers', function(req, res) {

// });

app.listen(3000);