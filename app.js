var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
})
  .then(client => {
    console.log("Vi är uppkopplade mot databasen.");
  })


module.exports = app;
