projectData = [];
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const Geonames = require('geonames.js')
const fetch = require("node-fetch");

//const { GN_UN } = require("./config");
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'))

const geonames = new Geonames({
    username: process.env.GN_UN,
    lan: 'en',
    encoding: 'JSON'
  });

app.get('/', function (req, res) {
    
    res.sendFile('dist/index.html')
})

app.post('/getWeather', async (req, res) =>{
    const request = await fetch(process.env.WIO_EP+"lat="+req.body.lat+"&lon="+req.body.lng+"&units=I&key="+process.env.WIO_KEY);
    try {
      // Transform into JSON
      const allData = await request.json();
      newEntry = {
        countryName: projectData[0].countryName,
        city: projectData[0].city,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        maxTemp: allData.data[0].max_temp,
        minTemp: allData.data[0].low_temp,
        weatherD: allData.data[0].weather.description
      }
      projectData[0] = newEntry;
      res.send(allData);
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
      console.log("Weather data unavailable at this time");
    }
})

app.post('/callGN', function (req, res){
    geonames.search({q: req.body.city})
.then(resp => {
  newEntry = {
    lat: resp.geonames[0].lat,
    lng: resp.geonames[0].lng
  }
  newProjectData = {
      countryName: resp.geonames[0].countryName,
      city: req.body.city
  }
  projectData.push(newProjectData);
  //send new entry - prevent need for extra array to be returned with a get
  res.send(newEntry);
})
.catch(err => {
    console.error(err);
    console.log("Unable to look up city at this time");
});
})

//pixabay api call
app.post('/getPic', async (req, res) =>{
    const request = await fetch(process.env.PB_EP+"key="+process.env.PB_KEY+"&q="+req.body.city+"+"+projectData[0].countryName+"&image_type=photo&pretty=true&per_page=3&safesearch=true");
    try {
      // Transform into JSON
      const allData = await request.json();
      newEntry = {
        countryName: projectData[0].countryName,
        city: projectData[0].city,
        startDate: projectData[0].startDate,
        endDate: projectData[0].endDate,
        maxTemp: projectData[0].maxTemp,
        minTemp: projectData[0].minTemp,
        weatherD: projectData[0].weatherD,
        picURL: allData.hits[0].webformatURL
      }
      projectData[0] = newEntry;
      res.send(allData);
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
      console.log("Photos unavailable at this time");
    }
})

//update ui
app.get('/show', function (req, res) {
    res.send(projectData[0]);
});

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Listening on port 3000!')
})