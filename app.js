var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chartRouter = require('./routes/chart');
var mainRouter = require('./routes/main');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/chart', chartRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/main', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

import express from "express";
import dotenv   from "dotenv";
import cors     from "cors";

import weatherRouter from "./routes/weather.router.js";

dotenv.config();

const app  = express();
app.use(cors());
app.use(express.json());

app.use("/weather", weatherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`  API listening on http://localhost:${PORT}`));
import express from 'express';
import forecastRouter from './routes/forecast.router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', forecastRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

import cityRouter from './routes/city.router.js';
app.use('/api', cityRouter);
module.exports = app;
