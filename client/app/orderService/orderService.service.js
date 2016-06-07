'use strict';

angular
  .module('4vSubShopApp')
  .service('orderService', function ($http, Auth) {

    var svc = this;

    svc.getOrder = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/order/');
    };

    svc.addItem = function(item) {
      var userId = Auth.getCurrentUser()._id;
      return $http.post('/api/users/' + userId + '/order/' + item._id);
    };

    svc.removeItem = function(orderItem) {
      var userId = Auth.getCurrentUser()._id;
      console.log(svc.order, svc.orderItem, svc.userId);
      return $http.delete('/api/users/' + userId + '/order/' + orderItem._id);
      // var index = svc.order.indexOf(orderItem);
      // svc.order[index].quantity -= 1;
      // if (svc.order[index].quantity == 0) {
      //   svc.order.splice(index, 1);
      // }
    };

    svc.getCost = function(orderItem) {
      return orderItem.qty * orderItem.item.price;
    };

    svc.getTotal = function(order) {
      var total = _.reduce(order, function(sum, orderItem) {
        return sum + svc.getCost(orderItem);
      }, 0);
      return total;
    };

    svc.clearOrder = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/order/');
    };
  });
