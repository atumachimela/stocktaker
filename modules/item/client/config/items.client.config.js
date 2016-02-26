'use strict';

// Configuring the Articles module
angular.module('items').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Items',
      state: 'items',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'items', {
      title: 'Liste des articles ',
      state: 'items.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'items', {
      title: 'Créer de Nouveaux Articles',
      state: 'items.create'
    });

  }
]);
