global.__base = __dirname + '/';
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var util = require('util');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var db = require('./db');
var ctrls = require('./ctrls');

// Passport session setup.
passport.use('local', new LocalStrategy(
  function(username, password, cb) {
    console.log(username, password, "Hello");
    db.users.findbyusername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user || user.length != 1) {
        return cb(null, false);
      }
      if (user[0].password != password) {
        return cb(null, false);
      }
      return cb(null, user[0]);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findbyid(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});


var app = express();
app.set('views', './frontside/html');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('build'));

app.use('/api/failed', function(req, res) {
  res.sendStatus(401)
});
app.post('/api/logout', ctrls.user.logout);
app.post('/api/login', passport.authenticate('local', {
  failureRedirect: '/api/failed'
}), ctrls.user.login);

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('library.dom.nyc listening on port %s', port);
});






// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
};