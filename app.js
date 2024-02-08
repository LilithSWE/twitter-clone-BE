var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const CryptoJS = require('crypto-js');
const crypto = require('crypto');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var msgRouter = require('./routes/message');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/msg', msgRouter);

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
})
  .then(client => {
    console.log("Vi är uppkopplade mot databasen.");
    const db = client.db("hackaton"); // databas döpt enligt önskemål
    app.locals.db = db;
  })


module.exports = app;
