'use strict';

angular.module('4vSubShopApp.auth', ['4vSubShopApp.constants', '4vSubShopApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
