'use strict';

// Articles controller
angular.module('specifications').controller('SizesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items', 'Specifications', 'Sizes',
  function ($scope, $stateParams, $location, Authentication, Items, Specifications, Sizes) {
    $scope.authentication = Authentication;
    $scope.hideWithdrawal = true;
    //Create new Specification
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'sizeForm');

        return false;
      }

      // Create new size
      var size = new Sizes({
        nomber: this.nomber,
        stockInit: this.stockInit,
        units: this.units,
        itemId: $stateParams.itemId,
        specId: $stateParams.specId
      });
      // Redirect after save
      size.$save(function (response) {
        $location.url('specifications/'+ $stateParams.itemId +'/spec/'+ $stateParams.specId);

        // Clear form fields
        $scope.nomber = '';
        $scope.stockInit = '';
        $scope.units = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove an existing Specified size
    $scope.remove = function (size) {

      if (size) {
        size.$remove();

        for (var i in $scope.sizes) {
          if ($scope.sizes[i] === size) {
            $scope.size.splice(i, 1);
          }
        }
      } else {
        $scope.size.$remove(function () {
          $location.url('specifications/'+ $stateParams.itemId +'/spec/'+ $stateParams.specId);
        });
      }
    };

    // // Update existing Specified size
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'sizeForm');

        return false;
      }
      var size = $scope.size;

      size.$update(function () {
        $location.url('specifications/'+ $stateParams.itemId +'/spec/'+ $stateParams.specId);
          }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of specified sizes
    $scope.find = function () {
        $scope.item = Items.get({itemId: $stateParams.itemId});
        $scope.specifications = Specifications.query({itemId: $stateParams.itemId});
        $scope.sizes = Sizes.query({itemId: $stateParams.itemId, specId: $stateParams.specId});
    };

    // // Find an existing Specified size
    $scope.findOne = function () {
      $scope.size = Sizes.get({
        itemId: $stateParams.itemId,
        specId: $stateParams.specId,
        sizeId: $stateParams.sizeId
      });
    };

    $scope.openWithdraw = function(){
      $scope.hideWithdrawal = false;
    };

    $scope.withdrawal = function(isValid){
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'sizeForm');

        return false;
      }
      $scope.size.stockNow = $scope.size.stockInit - $scope.size.withdrawal;
      var size = $scope.size;
      size.$update(function () {
        $scope.size.withdrawal = '';
        $location.url('specifications/'+ $stateParams.itemId +'/spec/'+ $stateParams.specId);
          }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
