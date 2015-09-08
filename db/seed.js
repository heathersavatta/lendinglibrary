global.__base = __dirname + '/../';
var db = require(__base + 'db'),
  step = require('step'),
  neo4j = require('node-neo4j'),
  neodb = new neo4j("http://localhost:7474/");



step(
  function createusernameconstraint() {
    neodb.createUniquenessConstraint('User', 'username', this);
  },
  function createdom(err) {
    if (err) console.log(err);

    db.users.create({
      username: 'dom',
      name: 'Dom Savatta',
      password: 'password'
    }, this);
  },
  function(err, user) {
    if (err) console.log(err);

  });