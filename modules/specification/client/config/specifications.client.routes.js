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
        templateUrl: 'modules/specification/client/views/list-item-specifications.client.view.html',
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
      });
      // .state('specifications.view', {
      //   url: '/:itemId',
      //   templateUrl: 'modules/item/client/views/view-item.client.view.html'
      // })
      // .state('specifications.edit', {
      //   url: '/:itemId/edit',
      //   templateUrl: 'modules/item/client/views/edit-item.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   }
      // });
  }
]);
