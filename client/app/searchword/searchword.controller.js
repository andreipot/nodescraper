'use strict';

angular.module('canApp')
  .controller('SearchwordCtrl',['$scope','$q','$http','Searchword', 'Campaign', function ($scope,$q, $http, Searchword, Campaign) {
    $scope.message = 'Hello';

    //get all keywords collection...
    $scope.searchwords = Searchword.query();

    //get all campaigns
    $scope.campaigns = Campaign.query();
    //console.log($scope.campaigns);
    //get all keywrods for a specific campaign
    $scope.searchwords = Searchword.query();//{created_campaign_id:$scope.campaign.created_campaign_id});
    //serp/live
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.searchword = {};
    $scope.campaign = {};

    $scope.completed = 0;
    //do serp
    //keyword is for searchword
    $scope.doSERP = function(searchword){

      var deferred = $q.defer();
      //updated searchword data
      $scope.updatedata = new Searchword();

      var payload = {
        keyword          : searchword.keyword,
        searchengine_id  : searchword.searchengine_id,
        domain           : $scope.campaign.domain
      };

      //call node API
      $http({
        method: 'put',
        url: '/api/searchwords/serp',
        params:payload
      })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
          //console.log(data);

          $scope.updatedata= Searchword.get({id : searchword._id},function(){
            $scope.updatedata.response = data;
            $scope.updatedata.$update(function(){
              //console.log('done');
        });
      });
    })
      .error(function(data){
        deferred.reject(data);
        //console.log('error');
        //console.log(data);
      })
     return deferred.promise;
    };


    $scope.serpCampaign = function() {

      if(!$scope.campaign)
        return;
      //first get all campaign searchwords
      //var searchwords = {};
      var searchwords = _.filter($scope.searchwords,function(data){
          return data.created_campaign_id == $scope.campaign.created_campaign_id;
      });

      //console.log(searchwords);
      var total = searchwords.length;
      var done = 0;
      angular.forEach(searchwords,function(searchword, key){
        var keepgoing = false;
        if(searchword.response != '')
        {
          done++;
          keepgoing = true;
        }
        if(!keepgoing) {
          $scope.doSERP(searchword)
            .then(function(data){
              //console.log('+1');
              // console.log(data);
              done++;
              $scope.completed = done / total * 100.0;
            });
        }

      });
    }
    $scope.getCampaignSerpRate = function(campaign) {

      //first get all campaign searchwords
      //var searchwords = {};
      var searchwords = _.filter($scope.searchwords,function(data){
        return data.created_campaign_id == campaign.created_campaign_id;
      });

      //console.log(searchwords);
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
      //console.log($scope.error);
    };

    $http.get('/api/campaigns/searchengines')
      .then(onResourceComplete, onError);

  }]);
