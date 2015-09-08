var passport = require('passport');

exports.login = function(req, res) {
  res.cookie('username', req.body.username);
  res.json({
    username: req.body.username
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.sendStatus(200);
};