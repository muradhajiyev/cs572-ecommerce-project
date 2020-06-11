var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const configData = require("./config.json");
const mongoose = require("mongoose");
const initRoutes = require('./routes');

var adminRouter = require("./routes/admin");

var app = express();

//swagger implementation
const swaggerDoc = require('./swaggerDoc');
swaggerDoc(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRouter);
initRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  let errStatus = err.status || 500;
  let dev = true; //req.app.get('env') === 'development'
  res.status(errStatus).json(new ApiResponse(errStatus, 'error', {message:err.message, error:dev ? err : {}}));
});

mongoose
  .connect(configData.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => console.error(err));

module.exports = app;
