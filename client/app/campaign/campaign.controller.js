'use strict';

angular.module('canApp')
  .controller('CampaignCtrl', ['$scope', '$q','$rootScope','$http','$location','$filter', function($scope,  $q, $rootScope, $http, $location,$filter) {
    $scope.message = 'Hello';
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.login_email = 'api_username=cem@copypanthers.com';
    $scope.login_API_KEY = 'api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

    //campaign init
    $scope.campaign= {}

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
    var createcampaign = function(form){
      var deferred = $q.defer();
      console.log($scope.campaign);
      var payload = {
        name          : $scope.campaign.name,
        searchengine_id: $scope.campaign.searchengine
      };
      var serializedData = $.param(payload);
      console.log(serializedData);

      var urlPost = $scope.rootURL+'campaigns?'+ $scope.login_email+'&'+$scope.login_API_KEY;
      //first create campain


      /*
      $http({
        method: 'POST',
        url: urlPost,
        data: serializedData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(result) {
        console.log(result);
      }, function(error) {
        console.log(error);
      }); */

      //$http.post(urlPost, payload )
      $http({
        method: 'POST',
        url: urlPost,
        data: serializedData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
             .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        })
      return deferred.promise;
    };

    //check
   $scope.savecampaign = function(form){
      createcampaign(form)
        .then(function(data){
          $scope.campaign_id = data.id;
     })
       .catch(function(errors){
         $scope.errors = errors;
       }).finally(function(data){
          console.log('finally:'+data);
       });
   }

  }]);
