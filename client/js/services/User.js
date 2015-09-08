lendinglibaryServices.factory('User', [

  function() {
    return {
      get: function(userid) {
        return {
          name: "john malko"
        };
      },
      list: function() {
        return [{
          name: "test item"
        }, {
          name: "test second item"
        }];
      }
    };
  }
]);