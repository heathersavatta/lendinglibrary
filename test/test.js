var neo4j = require('node-neo4j');
var db = new neo4j("http://localhost:7474/");

describe('neo4j Smoke Tests', function(next) {
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

});