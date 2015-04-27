'use strict';

angular.module('canApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/searchword', {
        templateUrl: 'app/searchword/searchword.html',
        controller: 'SearchwordCtrl',
        authenticate: true
      });
  });
