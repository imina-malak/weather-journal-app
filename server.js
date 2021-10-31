// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8080;
const server = app.listen(port, activeServer);
function activeServer(){
    console.log("server running");
    console.log(`server is running on localhost:${port}`)
}
// GET route
app.get('/Total', sendData);
function sendData (request, response) {
    response.send(projectData);
};
// POST route
app.post('/posting', posting);
function posting(req,res){
    projectData={
        Temperature:req.body.temp,
        Date:req.body.date,
        Feelings:req.body.content
    };
    console.log(projectData);
}