'use strict';

angular.module('canApp')
  .controller('CampaignCtrl', ['$scope','$rootScope','$http','$location','$filter', function($scope, $rootScope, $http, $location,$filter) {
    $scope.message = 'Hello';
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.login_email = 'api_username=cem@copypanthers.com';
    $scope.login_API_KEY = 'api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

    var headers = {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    //first fill in all search engines...
    var urlSearchEngineBase = $scope.rootURL+'searchengines?'+ $scope.login_email+'&'+$scope.login_API_KEY;
    var onResourceComplete = function(response) {
      $scope.allengines = response.data;

    };

    var onError = function(reason) {
      $scope.error = "Could not fetch search engines";
    };

    $http.get(urlSearchEngineBase)
      .then(onResourceComplete, onError);


    //Create Campaign
    //create company
    scope.createCampaitn = function(form){
      var deferred = $q.defer();

      var payload = company;
      $http.post('/api/company', payload )
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        })
      return deferred.promise;
    };
  }]);
