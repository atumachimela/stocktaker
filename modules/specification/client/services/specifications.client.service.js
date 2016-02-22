'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('specifications').factory('Specifications', ['$resource',
  function ($resource) {
    $resource('api/item/:itemId/spec/:specId', {
      itemId: '@itemId',
      specId: '@_id'
    }, {
    }); 
    return $resource('api/item/:itemId/spec/:specId', {
      itemId: '@item',
      specId: '@_id'
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
