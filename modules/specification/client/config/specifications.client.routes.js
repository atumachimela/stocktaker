'use strict';

// Setting up route
angular.module('specifications').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('specifications', {
        abstract: true,
        url: '/specifications',
        template: '<ui-view/>'
      })
      .state('specifications.list', {
        url: '/:itemId/spec',
        templateUrl: 'modules/item/client/views/view-item.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('specifications.create', {
        url: '/:itemId/create',
        templateUrl: 'modules/specification/client/views/create-item-specifications.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('specifications.view', {
        url: '/:itemId/spec/:specId',
        templateUrl: 'modules/specification/client/views/view-item-specifications.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('specifications.edit', {
        url: '/:itemId/spec/:specId/edit',
        templateUrl: 'modules/specification/client/views/edit-item-specifications.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
