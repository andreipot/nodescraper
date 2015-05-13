'use strict';

angular.module('canApp')
  .controller('DashboardCtrl',['$scope','$q','$http','Searchword', 'Campaign', function ($scope,$q, $http, Searchword, Campaign) {
    $scope.message = 'Hello';

    //get all keywords collection...
    $scope.searchwords = Searchword.query();

    //get all campaigns
    $scope.campaigns = Campaign.query();

    $scope.completed = 0;
    //do serp
    //keyword is for searchword

    $scope.getCampaignSerpRate = function(campaign) {

      //first get all campaign searchwords
      //var searchwords = {};
      var searchwords = _.filter($scope.searchwords,function(data){
        return data.created_campaign_id == campaign.created_campaign_id;
      });

      console.log(searchwords);
      var total = searchwords.length;
      var done = 0;
      angular.forEach(searchwords,function(searchword, key){
        if(searchword.response != ''){
          done++;
        }
      });
      return  { done : done,  total: total};
    }



    //get all search engines...
    var onResourceComplete = function(response) {
      $scope.allengines = JSON.parse(response.data);
      //  console.log('success');
      //  console.log(response.data);
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch search engines";
      console.log($scope.error);
    };

    $http.get('/api/campaigns/searchengines')
      .then(onResourceComplete, onError);


  }]);
