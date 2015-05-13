'use strict';

angular.module('canApp')
  .controller('DashboardCtrl',['$scope','$q','$http','Searchword', 'Campaign','Auth', function ($scope,$q, $http, Searchword, Campaign,Auth) {
    $scope.message = 'Hello';



    //get all campaigns
    $scope.campaigns = {};

    $scope.completed = 0;


    var campaigns = Campaign.query(function(){
      console.log('all campaigns');
      console.log(campaigns);
      var user_id = Auth.getCurrentUser()._id;

      $scope.campaigns = _.filter(campaigns,function(data){
        return _.indexOf(data.user_id, user_id) > -1;
      });

      //get all keywords collection...
      $scope.searchwords = Searchword.query(function(){
        angular.forEach($scope.campaigns,function(campaign,key){
          campaign.serp_status = $scope.getCampaignSerpRate(campaign);
        });
        //got all campaign serp status
      });

    });

    //do serp
    //keyword is for searchword
    $scope.loadCampaigns = function() {
      var user_id = Auth.getCurrentUser()._id;

      $scope.campaigns = _.filter($scope.campaigns,function(data){
        return _.indexOf(data.user_id, user_id) > -1;
      });
      angular.forEach($scope.campaigns,function(campaign,key){
        campaign.serp_status = $scope.getCampaignSerpRate(campaign);
      });
    }

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
    $scope.loadCampaigns();

  }]);
