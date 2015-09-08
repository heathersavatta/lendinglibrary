lendinglibaryControllers.controller('LibraryItemCtrl', ['$scope', 'Item',
  function($scope, Item) {
    $scope.items = Item.list();
  }
]);