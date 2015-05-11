'use strict';

angular.module('canApp')
  .controller('SearchwordCtrl',['$scope','$q','$http','Searchword', 'Campaign', function ($scope,$q, $http, Searchword, Campaign) {
    $scope.message = 'Hello';

    //get all keywords collection...
    $scope.searchwords = Searchword.query();

    //get all campaigns
    $scope.campaigns = Campaign.query();
    console.log($scope.campaigns);
    //get all keywrods for a specific campaign
    $scope.searchwords = Searchword.query();//{created_campaign_id:$scope.campaign.created_campaign_id});
    //serp/live
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.login_email = 'api_username=cem@copypanthers.com';
    $scope.login_API_KEY = 'api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

    $scope.searchword = {};


    //do serp
    //create company
    $scope.doSERP = function(form){
      var deferred = $q.defer();
      $scope.updatedata = new Searchword();
      var payload = {
        keyword          : $scope.searchword.keyword.keyword,
        searchengine_id: 1
      };
          $http({
        method: 'put',
        url: '/api/searchwords/serp',
        params:payload
      })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
          console.log(data);

              $scope.updatedata= Searchword.get({id : $scope.searchword.keyword._id},function(){
                $scope.updatedata.response = data;
                  $scope.updatedata.$update(function(){
                  console.log('done');
                });
              });


        })
        .error(function(data){
          deferred.reject(data);
          console.log('error');
          console.log(data);
        })
      return deferred.promise;
    };

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
