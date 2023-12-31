// Setup empty JS object to act as endpoint for all routes
 let projectData = {};

// Require Express to run server and routes
    const express = require('express');
// Start up an instance of app
 const app =express();
 const bodyParser =require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000;
const server = app.listen(port, listening);
function listening(){
     console.log("server running"); 
     console.log(`running on localhost: ${port}`);
}

// GET  route
app.get("/all", function (req, res) {
     res.send(projectData);
   })


// POST  route
app.post("/saveData", function (req, res) {
    let newData ={
        date :  req.body.date,
        temp : req.body.temp , 
        content : req.body.content
    };
  projectData=newData;
  res.send(projectData);
      
     });



