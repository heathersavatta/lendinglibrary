lendinglibaryServices.factory('Item', [

  function() {
    return {
      get: function(itemid) {
        return {
          name: "test item"
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