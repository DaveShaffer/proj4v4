'use strict';
(function(){

class ItemsComponent {
  constructor($state, itemService, orderService) {
    this.$state = $state;
    this.itemService = itemService;
    this.orderService = orderService;
    this.searchText = '';
    this.order = [];

    // Load order data from server
    this.orderService.getOrder().then((json) => {
      this.updateOrderFromServer(json.data);
    });

    // load inventory items from server
    this.getInventory();
  }

  find(order, item) {
    var len = order.length;
    for (var i = 0; i < len; i++) {
      if (order[i]._id === item._id) {
        return order[i];
      }
    }
    return null;
  }

  // diff the orderFromServer with our current order and make the incremental modifications
  // doing it this way makes our animation work.
  updateOrderFromServer(orderFromServer) {
    // add orderItems in orderFromServer not found in this.order
    var len = orderFromServer.length;
    var orderItem;
    for (var i = 0; i < len; i++) {
      orderItem = orderFromServer[i];
      if (!this.find(this.order, orderItem)) {
        this.order.splice(i, 0, orderItem);
      }
    }

    // check for remove or update
    i = this.order.length;
    while (i--) {
      orderItem = this.order[i];
      // remove orderItems in this.order not found in orderFromServer
      var found = this.find(orderFromServer, orderItem);
      if (!found) {
        this.order.splice(i, 1);
      }
      // update orderItems in this.order this have a different qty in orderFromServer
      else if (orderItem.qty !== found.qty) {
        orderItem.qty = found.qty;
      }
    }
  }

  getInventory() {
    this.itemService.getItems().then((json) => {
      this.inventory = json.data;
    });
  }

  addItem(item) {
    this.orderService.addItem(item).then((json) => {
      this.updateOrderFromServer(json.data);
    }, function(err) {
      console.log('ERROR: addItem: ' + JSON.stringify(err));
    });
  }

  removeItem(item) {
    this.orderService.removeItem(item).then((json) => {
      this.updateOrderFromServer(json.data);
    }, function(err) {
      console.log('ERROR: removeItem: ' + JSON.stringify(err));
    });
  }

  getCost(item) {
    return this.orderService.getCost(item);
  }

  clearOrder() {
    return this.orderService.clearOrder().then((json) => {
      this.updateOrderFromServer(json.data);
    }, function(err) {
      console.log('clearOrder delete ERROR: ' + JSON.stringify(err));
    });
  }

  goItem(item) {
    this.$state.go('itemDetail', {
      itemId: item._id
    });
  }

  getTotal() {
    return this.orderService.getTotal(this.order);
  }
}

angular
  .module('4vSubShopApp')
  .component('items', {
    templateUrl: 'app/items/items.html',
    controller: ItemsComponent
  });

})();
