'use strict';

angular.module('canApp')
  .controller('SearchwordCtrl',['$scope','$http','Searchword', 'Campaign', function ($scope, $http, Searchword, Campaign) {
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
    $scope.serpKeyword = function(id){
      var keyword = Searchword.findById();
      var rootURL = $scope.rootURL +'serp/live' + [$scope.login_email , $scope.login_API_KEY , 'keyword='+keyword.keyword,'searchengine+id='+keyword.searchengine_id].join('&');
      $http.get(rootURL).
        then(function(data){
          console.log(data);
          $scope.searchword = Searchword.get({id : id});
          $scope.searchword.response = data;
          $scope.searchword.$save();
        }).
        error(function(err){

        });
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
