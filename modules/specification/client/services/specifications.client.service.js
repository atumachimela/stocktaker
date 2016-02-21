'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('specifications').factory('Specifications', ['$resource',
  function ($resource) {
    return $resource('api/item/:itemId/spec/:specId', {
      itemId: '@itemId',
      specId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
