
require('dotenv').config();
const logger = require('morgan');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookie = require("cookie-parser");
const express = require('express');

// Import the mysql package
const mysql = require('mysql');

// Create a new express app
const app = express();

// Set the view engine to use EJS templates
app.set('view engine', 'ejs');

// Use the body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//tells Express to serve any static files (like your HTML and CSS files) from the public directory.
app.use(express.static('public'));

// Use the register router for the /register URL (back-end)
app.use('/api/register', registerRouter);

// Use the register router for the /register URL
// app.use('/api/login', loginRouter);

// Create a new connection using the createConnection method
const db = require("./db-config");

// Connect to the database using the connect method
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Define a route that renders the register page (front)
app.get('/register', function (req, res) {
  res.render("register.ejs")
});

// Define a route that renders the login page (front)
app.get('/login', function (req, res) {
  res.render("login.ejs")
});


// Start the server and listen for incoming requests on port 3000
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});