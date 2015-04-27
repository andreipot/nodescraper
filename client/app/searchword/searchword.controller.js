'use strict';

angular.module('canApp')
  .controller('SearchwordCtrl',['$scope','$http','Searchword', function ($scope, $http, Searchword) {
    $scope.message = 'Hello';

    //serp/live
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.login_email = 'api_username=cem@copypanthers.com';
    $scope.login_API_KEY = 'api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

    $scope.serpKeyword = function(id){
      var keyword = Searchword.findById();
      var rootURL = $scope.rootURL +'serp/live' + [$scope.login_email , $scope.login_API_KEY , 'keyword='+keyword.keyword,'searchengine+id='+keyword.searchengin_id].join('&');
      $http.get(rootURL).
        then(function(data){
          console.log(data);
        }).
        error(function(err){

        });
    }

    //get all serach engines
    var urlSearchEngineBase = $scope.rootURL+'searchengines?'+ $scope.login_email+'&'+$scope.login_API_KEY;
    var onResourceComplete = function(response) {
      $scope.allengines = response.data;

    };

    var onError = function(reason) {
      $scope.error = "Could not fetch search engines";
    };

    $http.get(urlSearchEngineBase)
      .then(onResourceComplete, onError);
  }]);
