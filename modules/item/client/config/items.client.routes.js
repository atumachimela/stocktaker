'use strict';

// Setting up route
angular.module('items').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('items', {
        abstract: true,
        url: '/item',
        template: '<ui-view/>'
      })
      .state('items.list', {
        url: '',
        templateUrl: 'modules/item/client/views/list-items.client.view.html'
      })
      .state('items.create', {
        url: '/create',
        templateUrl: 'modules/item/client/views/create-item.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('items.view', {
        url: '/:itemId',
        templateUrl: 'modules/item/client/views/view-item.client.view.html'
      })
      .state('items.edit', {
        url: '/:itemId/edit',
        templateUrl: 'modules/item/client/views/edit-item.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('items.createspec', {
        url: '/:itemId/spec/create',
        templateUrl: 'modules/item/client/views/create-specification.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
      // .state('items.listspec', {
      //   url: '/:itemId/spec/',
      //   templateUrl: 'modules/item/client/views/list-specifications.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   }
      // });
  }
]);
