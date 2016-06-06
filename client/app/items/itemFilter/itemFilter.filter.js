'use strict';

angular.module('4vSubShopApp')
  .filter('itemFilter', function() {
    function isMatch(str, pattern) {
      return str.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
    }

    return function(inventory, searchText) {
      var items = {
        searchText: searchText,
        out: []
      };
      angular.forEach(inventory, function (item) {
        if (isMatch(item.name       , this.searchText) ) {
          this.out.push(item);
        }
      }, items);
      return items.out;
    };
  });
