const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// fetch npm to use fetch in node.js
const fetch = require('node-fetch');

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


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('listening on port 8082!')
    console.log(`My API key is ${process.env.API_KEY} it's okay you can hack me`);
})

// Post req form the meaningcloud API
app.post('/postapi', postApi)

async function postApi(req, res){

const userInput = req.body;
console.log(userInput);
const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&of=json&txt=${userInput}`;
const response =  await fetch(apiUrl);
const data = await response.json();
console.log(data);
res.json(data);

};