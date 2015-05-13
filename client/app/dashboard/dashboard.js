'use strict';

angular.module('canApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      });
  });
