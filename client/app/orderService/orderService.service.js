'use strict';

angular.module('4vSubShopApp')
  .service('orderService', function ($http, Auth) {

    var that = this;

    that.getOrder = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/order/');
    };

    that.addItem = function(item) {
      var userId = Auth.getCurrentUser()._id;
      return $http.post('/api/users/' + userId + '/order/' + item._id);
    };

    that.removeItem = function(orderItem) {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/order/' + orderItem._id);
    };

    that.getCost = function(orderItem) {
      return orderItem.qty * orderItem.item.price;
    };

    that.getTotal = function(order) {
      var total = _.reduce(order, function(sum, orderItem) {
        return sum + that.getCost(orderItem);
      }, 0);
      return total;
    };

    that.clearOrder = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/order/');
    };
  });
