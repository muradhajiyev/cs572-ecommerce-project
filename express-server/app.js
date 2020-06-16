const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require(path.join(__dirname, 'config.json'));
const initRoutes = require('./routes');
const ApiResponse = require('./controllers/viewmodels/ApiResponse');
const cors = require('cors');
const app = express();

var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
  // 'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  let errStatus = err.status || 500;
  let dev = config.ENV === 'development'
  if (dev) console.error('error handler: ', err);
  res.status(errStatus).json(new ApiResponse(errStatus, 'error', {message:err.message, stack:dev ? err.stack : ""}));
});


module.exports = app;
