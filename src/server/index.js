const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')

// fetch npm to use fetch in node.js
const fetch = require('node-fetch');

const json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

// Meaningcloud API info
const apiKey =  process.env.API_KEY;

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('listening on port 8081!')
    console.log(`My API key is ${process.env.API_KEY} it's okay you can hack me`);
})
