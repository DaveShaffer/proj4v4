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
      return $http.delete('/api/users/' + userId + '/order/' + orderItem._id);
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
