'use strict';
(function(){

class ItemsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('4vSubShopApp')
  .component('items', {
    templateUrl: 'app/items/items.html',
    controller: ItemsComponent
  });

})();
