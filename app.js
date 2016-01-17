var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var navigation_tabs = [
  {name:'boot', route:null},
  {name:'clyp', route:null},
  {name:'marvel', route:null},
  {name:'chat', route:null}
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

/**
 * Passport OAUTH stuff with Twitter
 */
passport.use(new Strategy({
      // I should obfuscate these but... that's for later
      consumerKey:  'G1QPKOEi4ONljqE9LtAIUzvDE',
      consumerSecret:  'gFhgn1aFHSLTh4MsrUiaSzSwd8c9B9ip2RXEievSvjic7bsujY',
      callbackURL: 'http://joshuahurt.herokuapp.com/auth/twitter'
    },
    function(token, tokenSecret, profile, cb) {
      // In this example, the user's Twitter profile is supplied as the user
      // record.  In a production-quality application, the Twitter profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);

    }));

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('express-session')
  ({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Routing for authentication/redirection
app.get('/chat', function(req, res) {
  res.render('chat', { user: req.user });
})
app.get('/auth', passport.authenticate('twitter'));

app.get('/auth/twitter',
    passport.authenticate('twitter', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
      //res.render('chat', {user: req.user});
      res.redirect('/chat/auth');
    });
app.get('/chat/auth', function(req, res) {
  console.log(res.url);
  params.user = req.user;
  res.render('chat', params);
});


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


var params = {
  menu: ['portfolio', 'peeber', 'clyp', 'marvel', 'chat'],
  images: [0,0,0,0,0],
  user: null
};
module.exports = app;
