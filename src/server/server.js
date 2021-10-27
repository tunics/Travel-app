const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require("path");
const express = require("express");

const app = express();

app.use(express.static("dist"));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
const { get } = require("http");
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log("Travel App listening on port 3000!");
});

// GET route
app.get("/all", sendData);

function sendData(request, response) {
    response.send(projectData);
}

// POST route
app.post("/add", callBack);

function callBack(req, res) {
    res.send("POST received");
}

// Post an entry
app.get("/allEntries", getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}

app.post("/addEntry", addEntry);

function addEntry(req, res) {
    newEntry = {
        place: req.body.place,
        weather: req.body.weather,
        dates: req.body.dates,
    };
    projectData = newEntry;
    console.log(projectData);
}

//Get API Keys
app.get("/keys", getKeys);

function getKeys(req, res) {
    const keys = {
        pixabay: process.env.PIXABAY_KEY,
        weatherbit: process.env.WEATHERBIT_KEY,
        geonames: process.env.GEONAMES_USER,
    };
    console.log("Sending keys: ");
    console.log(keys);
    res.send(keys);
}

let toDoData = {};

app.get("/toDoList", function getToDo(req, res) {
    res.send(toDoData);
    console.log(toDoData);
});

app.post("/toDoList", addToDo);

function addToDo(req, res) {
    newEntry = {
        list: req.body.list,
    };
    toDoData = newEntry;
    console.log(toDoData);
}
