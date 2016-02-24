'use strict';
//Specifications service used for communicating with the articles REST endpoints
angular.module('specifications').factory('Sizes', ['$resource',
  function ($resource) {
    $resource('api/item/:itemId/spec/:specId/size/:sizeId', {
      itemId: '@itemId',
      specId: '@specId',
      sizeId: '@_id'
    }, {
    }); 
    return $resource('api/item/:itemId/spec/:specId/size/:sizeId', {
      itemId: '@itemId',
      specId: '@specId',
      sizeId: '@_id'
    }, {
      remove: {
        method: 'DELETE'
      },
      update: {
        method: 'PUT'
      }
    });
  }
]);
