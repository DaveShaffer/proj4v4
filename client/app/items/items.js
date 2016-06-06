'use strict';

angular.module('4vSubShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        url: '/items',
        template: '<items></items>'
      });
  });
