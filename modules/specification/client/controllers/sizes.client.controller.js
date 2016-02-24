'use strict';

// Articles controller
angular.module('specifications').controller('SizesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items', 'Specifications', 'Sizes',
  function ($scope, $stateParams, $location, Authentication, Items, Specifications, Sizes) {
    $scope.authentication = Authentication;

    //Create new Specification
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'sizeForm');

        return false;
      }

      // Create new Article object
      var size = new Sizes({
        nomber: this.nomber,
        stockInit: this.stockInit,
        units: this.units,
        itemId: $stateParams.itemId,
        specId: $stateParams.specId,
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

    // Remove existing Specification
    // $scope.remove = function (specification) {

    //   if (specification) {
    //     specification.$remove();

    //     for (var i in $scope.specifications) {
    //       if ($scope.specifications[i] === specification) {
    //         $scope.specification.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.specification.$remove(function () {
    //       $location.url('item/'+ $stateParams.itemId);
    //     });
    //   }
    // };

    // // Update existing Specification
    // $scope.update = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'specForm');

    //     return false;
    //   }
    //     console.log('update', $scope.specification);
    //   var specification = $scope.specification;

    //   specification.$update(function () {
    //       $location.url('item/'+ $stateParams.itemId);        
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // Find a list of Sizes
    $scope.find = function () {
        $scope.item = Items.get({itemId: $stateParams.itemId});
        $scope.specifications = Specifications.query({itemId: $stateParams.itemId});
        $scope.sizes = Sizes.query({itemId: $stateParams.itemId, specId: $stateParams.specId});
    };

    // // Find existing Specification
    $scope.findOne = function () {
      $scope.sizes = Sizes.query({
        itemId: $stateParams.itemId,
        specId: $stateParams.specId
      });
      console.log('A size', $scope.sizes);
      console.log($stateParams.sizeId);
      // forEach($scope.sizes, function(size, key){
      //   console.log(size);
      //   console.log($scope.sizes);
      //     // if(size._id.toString() == $stateParams.sizeId.toString()){
      //     //   console.log(size);
      //     // }
      // });
    };
  }
]);
