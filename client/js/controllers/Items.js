lendinglibaryControllers.controller('LibraryItemsCtrl', ['$scope', 'Item',
  function($scope, Item) {
    $scope.items = Item.get();
  }
]);