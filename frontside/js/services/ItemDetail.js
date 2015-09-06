lendinglibaryServices.factory('Item', [

  function() {
    return {
      get: function(item) {
        return {
          name: "test item"
        };
      },
      list: function(item) {
        return [{
          name: "test item"
        }, {
          name: "test second item"
        }];
      }
    };
  }
]);