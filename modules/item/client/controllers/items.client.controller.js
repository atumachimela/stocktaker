'use strict';

// Articles controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items',
  function ($scope, $stateParams, $location, Authentication, Items) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'itemForm');

        return false;
      }

      // Create new Article object
      var item = new Items({
        itemName: this.itemName,
      });

      // Redirect after save
      item.$save(function (response) {
        $location.path('item/' + response._id);

        // Clear form fields
        $scope.itemName = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (item) {
      if (item) {
        item.$remove();

        for (var i in $scope.items) {
          if ($scope.items[i] === item) {
            $scope.items.splice(i, 1);
          }
        }
      } else {
        $scope.item.$remove(function () {
          $location.path('items');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'itemForm');

        return false;
      }

      var item = $scope.item;

      item.$update(function () {
        $location.path('items/' + item._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.items = Items.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.item = Items.get({
        itemId: $stateParams.itemId
      });
    };
  }
]);
