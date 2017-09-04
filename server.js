// server.js
// where your node app starts

// init project
const express = require('express');
const mongoDB = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlController = require('./urlController');

const app = express();
const Schema = mongoose.Schema;

const url = process.env.DATABASE_URL;


mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('openUri', () => {
  console.log('database conection is active');
});

// middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Routes
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:value", urlController.fetchResult);

app.get("/new/:url*", urlController.shortenUrl);
app.post("/new", (urlController.shortenUrl));

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
