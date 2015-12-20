var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var navigation_tabs = [
  {name:'index', route:''},
  {name:'users', route:''},
  {name:'boot', route:''},
  {name:'blog', route:''},
  {name:'clyp', route:''},
  {name:'marvel', route:''}
];

//for (var i = 0; i < navigation_tabs.length; i++) {
//  navigation_tabs[i][1] = require('./routes/'+navigation_tabs[i][0]);
//}
var index = require('./routes/index');
var users = require('./routes/users');
var boot = require('./routes/boot');
var stuff = require('./routes/stuff');
var blog = require('./routes/blog');
var clyp = require('./routes/clyp');
var marvel = require('./routes/marvel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for (var i = 0; i < navigation_tabs.length; i++) {
//  name = navigation_tabs[i].name;
//  app.user('/'+name, name);
//}
app.use('/', boot);
app.use('/blog', blog);
app.use('/marvel', marvel);
app.use('/users', users);
app.use('/boot', boot);
app.use('/clyp', clyp);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
