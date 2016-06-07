'use strict';

angular
  .module('4vSubShopApp')
  .service('itemService', function($http) {

    var svc = this;

    svc.findItemById = function(id) {
      return $http.get('/api/items/' + id);
    };

    svc.getItems = function() {
      return $http.get('/api/items');
   };
  });
