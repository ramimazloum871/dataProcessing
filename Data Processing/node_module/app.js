const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);


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
//const xmlRoutes = require('./api/routes/xml');
const budget_langRoutes = require('./api/routes/budget_lang');
const genresRoutes = require('./api/routes/genres');
const voteRoutes = require('./api/routes/vote');
const castRoutes = require('./api/routes/cast');



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));

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
//app.use('/xml', xmlRoutes);
app.use('/budget_lang', budget_langRoutes);
app.use('/genres', genresRoutes);
app.use('/cast', castRoutes);
app.use('/vote', voteRoutes);


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