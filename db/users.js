var neo4j = require('node-neo4j');
var db = new neo4j("http://localhost:7474/");

exports.findbyusername = function(username, next) {
  db.readNodesWithLabelsAndProperties('User', {
    username: username
  }, next);
}
exports.findbyid = function(userid, next) {
  db.readNode(userid, function(err, result) {
    next(err, result);
  });
};
exports.create = function(user, next) {
  db.insertNode(user, 'User', next);
};