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
        $location.url('item/'+ $stateParams.itemId);

        // Clear form fields
        $scope.title = '';
        $scope.specType = '';
        $scope.color = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Specification
    $scope.remove = function (specification) {

      if (specification) {
        specification.$remove();

        for (var i in $scope.specifications) {
          if ($scope.specifications[i] === specification) {
            $scope.specification.splice(i, 1);
          }
        }
      } else {
        $scope.specification.$remove(function () {
          $location.url('item/'+ $stateParams.itemId);
        });
      }
    };

    // // Update existing Specification
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'specForm');

        return false;
      }
      var specification = $scope.specification;

      specification.$update(function () {
          $location.url('item/'+ $stateParams.itemId);        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Specifications
    $scope.find = function () {
        $scope.item = Items.get({itemId: $stateParams.itemId});
        $scope.specifications = Specifications.query({itemId: $stateParams.itemId});

    };

    // // Find existing Specification
    $scope.findOne = function () {
      $scope.specification = Specifications.get({
        itemId: $stateParams.itemId,
        specId: $stateParams.specId
      });
    };
  }
]);
