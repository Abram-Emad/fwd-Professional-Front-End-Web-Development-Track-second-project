// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Callback function to complete GET '/all'
app.get('/All', function GetingInfo(req, res) {res.status(200).send(projectData)});

// Post Route
app.post('/add', function AddingInformation(req, res) {
    projectData={
        temp:req.body.temp,
        maxtemp:req.body.maxtemp,
        mintemp:req.body.mintemp,
        date:req.body.date,
        content:req.body.content
    };
    res.status(200).send(projectData);
});

// Setup Server
const port = 4400;
const server = app.listen(port, function ListeningTo() {console.log(`Server is running at http://localhost:${port}`)});
