'use strict';

angular.module('canApp')
  .controller('CampaignCtrl', ['$scope', '$q','$rootScope','$http','$location','$filter','Campaign','Searchword','Auth', function($scope,  $q, $rootScope, $http, $location,$filter, Campaign, Searchword,Auth) {
    $scope.rootURL = 'http://api.domaincrawler.com/v2/';
    $scope.login_email = 'api_username=cem@copypanthers.com';
    $scope.login_API_KEY = 'api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

    //campaign init
    $scope.campaign= {};
    $scope.searchword = {
      campaign_id : 0,
      searchengine_id : 0,
      response: '',
      keyword: ''
    };
    console.log(Auth.getCurrentUser());
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

    //csv file upload...
    $scope.MyFiles=[];

    $scope.handler=function(e,files){
      var reader=new FileReader();
      reader.onload=function(e){
        var string=reader.result;
        var obj=$filter('csvToObj')(string);
        //do what you want with obj !
        //save Keyword collection...
        console.log(obj);
        console.log('got files');
        $scope.MyFiles = obj;
      }
      reader.readAsText(files[0]);
    }

              //save searchword collection
              $scope.saveKeywordsCollection = function(data){

              //save data keyword
              angular.forEach($scope.MyFiles,function(entry,key){
                var keyword_document = {
              keyword :entry.keyword,
              campaign_id: $scope.campaign_id,
              searchengine_id: $scope.campaign.searchengine,
              response: ''
            };
            /*
            $scope.searchword.keyword = entry.keyword;
            $scope.searchword.campaign_id = $scope.campaign_id;
            $scope.searchword.searchengine_id = $scope.campaign.searchengine_id;
            $scope.searchword.response = '';
            */
            console.log('saving');
            console.log(keyword_document);
            Searchword.save(keyword_document, function(data){
              console.log(data);
              console.log('keyword saved');
          });
        });
    }

    //check
    $scope.savecampaign = function(form){
      createcampaign(form)
        .then(function(data){
          $scope.campaign_id = data.id;

          //save form into monogodb by calling local API

          $scope.submitted = true;

          if(form.$valid) {
              Campaign.save($scope.campaign, function(data){
                console.log(data);
                $scope.saveKeywordsCollection(data);
              })
          }

        })
        .catch(function(errors){
          $scope.errors = errors;
      }).finally(function(data){
      console.log('finally:'+data);
    });
   }

  }]);
