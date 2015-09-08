global.__base = __dirname + '/../';

// 
// cd /usr/local/Cellar/neo4j/2.0.0/libexec/data
// neo4j stop
// rm -rf graph.db/
// neo4j start



describe('neo4j Smoke Tests', function(next) {
  var neo4j = require('node-neo4j');
  var db = new neo4j("http://localhost:7474/");
  it('should insert, read, delete a node', function(next) {

    db.insertNode({
      testnode: true,
      name: 'Darth Vader',
      sex: 'male'
    }, function(err, node) {
      if (err) {
        next('Error saving new node to database:' + err);
      } else {
        db.readNode(node._id, function(err, node) {
          if (err) {
            next('error reading node from database' + err);
          } else {
            db.deleteNode(node._id, function(err, node) {
              if (err) {
                next('error deleting node from database' + err);
              } else {
                if (node === true) {
                  // node deleted
                  next();
                } else {
                  // node not deleted because not found or because of existing relationships and such
                  next('error deleting node from the database');
                }
              }
            });
          }
        });
      }
    });
  });
  it('should find user dom', function(next) {
    db.readNodesWithLabelsAndProperties('User', {
      username: 'dom'
    }, function(err, result) {
      if (err) {
        next(err);
      } else if (result.length != 1 && result.name != 'Dom Savatta') {
        next('error finding user named dom result length = ' + result.length);
      } else {
        next()
      }
    });
  });

});



describe('db helpers', function(next) {
  var db = require(__base + 'db');
  it('should try to create user dom', function(next) {
    db.users.create({
      username: 'dom',
      name: 'Dom Savatta',
      password: 'password'
    }, function(err, result) {
      if (!err) {
        next('should have not been able to add user dom due to unique constrain on username');
      } else {
        next();
      }
    });
  });
  it('should find user dom', function(next) {
    db.users.findbyusername('dom', function(err, result) {
      if (err) {
        next(err);
      } else if (result.length != 1 || result[0].name != 'Dom Savatta') {
        next('error finding user named dom result length = ' + result.length);
      } else {
        next();
      }
    });
  });
  it('should find user by id', function(next) {
    db.users.findbyusername('dom', function(err, result) {
      if (err) {
        next(err);
      } else if (result.length != 1 || result[0].name != 'Dom Savatta') {
        next('error finding user named dom result length = ' + result.length);
      } else {
        var nodeid = result[0]._id;
        db.users.findbyid(nodeid, function(err, result) {
          if (err) {
            next(err);
          } else if (result.name != 'Dom Savatta') {
            next('error retreiving user');
          } else {
            next();
          }
        });
      }
    });
  });
});