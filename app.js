var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var navigation_tabs = [
  {name:'index', route:null},
  {name:'users', route:null},
  {name:'boot', route:null},
  {name:'blog', route:null},
  {name:'clyp', route:null},
  {name:'marvel', route:null}
];

for (var i = 0; i < navigation_tabs.length; i++) {
  navigation_tabs[i].route = require('./routes/'+navigation_tabs[i].name);
}

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

for (var i = 0; i < navigation_tabs.length; i++) {
  tab = navigation_tabs[i];
  if (tab.name === 'boot')
    app.use('/', tab.route);
  else
    app.use('/'+tab.name, tab.route);
}


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
