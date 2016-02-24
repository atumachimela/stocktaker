'use strict';

// Setting up route
angular.module('specifications').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('sizes', {
        abstract: true,
        url: '/sizes',
        template: '<ui-view/>'
      })
      .state('sizes.list', {
        url: '/:itemId/spec/:specId/',
        templateUrl: 'modules/item/client/views/view-item.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('sizes.create', {
        url: '/:itemId/spec/:specId/create',
        templateUrl: 'modules/specification/client/views/add-item-specification-sizes.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('sizes.view', {
        url: '/:itemId/spec/:specId/size/:sizeId',
        templateUrl: 'modules/specification/client/views/view-item-specification-sizes.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
      // .state('specifications.edit', {
      //   url: '/:itemId/spec/:specId/edit',
      //   templateUrl: 'modules/specification/client/views/edit-item-specifications.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   }
      // });
  }
]);
