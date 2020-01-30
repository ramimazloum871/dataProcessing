const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser')

// DataBase 
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "movie"
});
con.connect(function (err) {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



const movieRoutes = require('./api/routes/movie');
const xmlRoutes = require('./api/routes/xml');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POSt, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(function (req, res, next) {
  req.con = con;
  next();
});
// Routes which should handld requests

app.use('/movie', movieRoutes);
app.use('/xml', xmlRoutes);


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;