'use strict';

// Setting up route
angular.module('specifications').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('specifications', {
        abstract: true,
        url: '/item',
        template: '<ui-view/>'
      })
      .state('specifications.list', {
        url: '/item/:itemId/spec',
        templateUrl: 'modules/item/client/views/list-specifications.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
      // .state('specifications.create', {
      //   url: '/create',
      //   templateUrl: 'modules/item/client/views/create-item.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   }
      // })
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
