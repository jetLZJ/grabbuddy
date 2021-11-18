/* JS version
var http = require('http'); // Import Node.js core module


var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/student") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    
    }
    else
        res.end('Invalid Request!');

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')

*/

// Express version

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

require('dotenv').config();
const { Client } = require('pg');
//const { auth } = require('express-openid-connect');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const { auth } = require('express-oauth2-jwt-bearer');






var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/users', function(req, res) {
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }});  
    client.connect();
  //  let qs = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'gb' ORDER BY table_name;"
    let qs= "SELECT * FROM gb.user";
    let query = client.query(qs, (err, result) => {
    console.log(client.query);
        
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
    client.end();
    });

});

router.get('/users', function(req, res) {
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }});  
    client.connect();
    let qs = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'gb' ORDER BY table_name;"
    let qs2= "SELECT * FROM gb.user";
    let query = client.query(qs, (err, result) => {
    console.log(client.query);
        
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
    client.end();
    });

});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);