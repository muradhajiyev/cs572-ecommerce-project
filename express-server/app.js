var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const initRoutes = require('./routes');

var app = express();

//swagger implementation
const swaggerDoc = require('./swaggerDoc');
swaggerDoc(app);


app.use(logger('dev'));
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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//onlineshoping is the database name
// mongoose.connect('mongodb://localhost:27017/onlineshopping', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => {
//       app.listen(3000, () => {
//         console.log('Server is running on 3000');
//       })
//     })
//     .catch(err => console.log(err));

module.exports = app;
