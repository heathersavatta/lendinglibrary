var express = require('express');
var passport = require('passport');
var util = require('util');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Twitter profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  console.log("serializing user", user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing obj", obj);
  done(null, obj);
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
app.use('/public', express.static('public'));
app.use(express.static('build'));

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
  res.redirect('/login')
}