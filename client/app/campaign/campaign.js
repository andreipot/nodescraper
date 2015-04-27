'use strict';

angular.module('canApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/campaign', {
        templateUrl: 'app/campaign/campaign.html',
        controller: 'CampaignCtrl',
        authenticate: true
      });
  });
