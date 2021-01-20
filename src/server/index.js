const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// fetch npm to use fetch in node.js
const fetch = require('node-fetch');

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.status(200).sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log('listening on port 8082!');
  console.log(
    `My API key is ${process.env.GeoNames_KEY} it's okay you can hack me`
  );
});

// GeoNames API
const geoApiKey = process.env.GeoNames_KEY;
// Post req form the GeoNames API
app.post('/geonames', async function (req, res) {
  const { city } = req.body;
  console.log(city);
  const apiUrl = `http://api.geonames.org/searchJSON?q=${city}&username=${geoApiKey}&type=json`;
  const response = await fetch(apiUrl);
  const geoData = await response.json();
  console.log(geoData);
  res.json(geoData);
});

// WeatherBit API
const weatherbitKey = process.env.weatherbit_KEY;
// Post req form the WeatherBit API
app.post('/weatherbit', async function (req, res) {
  const { lat } = req.body;
  const { lon } = req.body;

  console.log(lat, lon);
  const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${weatherbitKey}`;
  const response = await fetch(apiUrl);
  const weatheData = await response.json();
  console.log(weatheData);
  res.json(weatheData);
});

// Pixabay API
const pixabayKey = process.env.pixabay_KEY;
// Post req form the Pixabay API
app.post('/pixabay', async function (req, res) {
  const { city } = req.body;
  console.log(city);
  const apiUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${city}&image_type=photo`;
  const response = await fetch(apiUrl);
  const pixabayData = await response.json();
  if (pixabayData.totalHits > 0) {
    console.log(pixabayData);
    res.json(pixabayData);
  } else {
    alert("we couldn't find a city matches your search");
  }
});

module.exports = app;
