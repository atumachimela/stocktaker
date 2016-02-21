'use strict';

// Articles controller
angular.module('specifications').controller('SpecsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items', 'Specifications',
  function ($scope, $stateParams, $location, Authentication, Items, Specifications) {
    $scope.authentication = Authentication;

    //Create new Specification
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'specForm');

        return false;
      }

      // Create new Article object
      var specification = new Specifications({
        title: this.title,
        specType: this.specType,
        color: this.color,
        itemId: $stateParams.itemId
      });
      
      // Redirect after save
      specification.$save(function (response) {
        console.log('saved', response);
        $location.path('item/'+ $stateParams.itemId + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.specType = '';
        $scope.color = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // // Remove existing Article
    // $scope.remove = function (item) {
    //   if (item) {
    //     item.$remove();

    //     for (var i in $scope.items) {
    //       if ($scope.items[i] === item) {
    //         $scope.items.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.item.$remove(function () {
    //       $location.path('items');
    //     });
    //   }
    // };

    // // Update existing Article
    // $scope.update = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'itemForm');

    //     return false;
    //   }

    //   var item = $scope.item;

    //   item.$update(function () {
    //     $location.path('items/' + item._id);
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // Find a list of Articles
    $scope.find = function () {
        $scope.item = Items.get({itemId: $stateParams.itemId});
        console.log('hehe', $scope.item);
        console.log('hee', $stateParams.itemId);
        $scope.specifications = Specifications.query({itemId: $stateParams.itemId});
      console.log('specs', $scope.specifications);
    };

    // // Find existing Article
    // $scope.findOne = function () {
    //   $scope.item = Items.get({
    //     itemId: $stateParams.itemId
    //   });
    //   console.log($scope.item);
    // };
  }
]);
