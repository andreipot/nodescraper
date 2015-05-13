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
      searchengine_id : 1,
      response: '',
      keyword: ''
    };
    //test init
    $scope.campaign.user_id = Auth.getCurrentUser()._id;

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

      //Create Campaign
    //create company
    var createcampaign = function(form){
      var deferred = $q.defer();

      console.log($scope.campaign);
      var payload = {
        name          : $scope.campaign.name,
        searchengine_id: $scope.campaign.searchengine.id
      };
            var urlPost = $scope.rootURL+'campaigns?'+ $scope.login_email+'&'+$scope.login_API_KEY;
      //first create campain

      $http({
        method: 'POST',
        url: '/api/campaigns/createcampaign',
        data: payload
        })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
          console.log(data);
        })
        .error(function(data){
          deferred.reject(data);
          console.log('error');
          console.log(data);
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
        //console.log(obj);
        //console.log('got files');
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
                created_campaign_id: $scope.campaign_id,
                campaign_id:$scope.current_campaign,
            searchengine_id: $scope.campaign.searchengine.id,
            response: ''
          };

          //console.log('saving');
          //console.log(keyword_document);
          Searchword.save(keyword_document, function(data){
            //console.log(data);
            //console.log('keyword saved');
        });
      });
    }

    //check
    $scope.savecampaign = function(form){
      createcampaign(form)
        .then(function(data){
          var result = JSON.parse(data);
          //console.log(result);
          $scope.campaign_id = result.id;
          //save form into monogodb by calling local API

          $scope.submitted = true;

          if(form.$valid) {
            var campaigndata = {
              name: $scope.campaign.name,
              domain: $scope.campaign.domain,
            created_campaign_id:$scope.campaign_id,
              searchengine_id:  $scope.campaign.searchengine.id,
              user_id: $scope.campaign.user_id
            }
              Campaign.save(campaigndata, function(data){
                //console.log(data);
                $scope.current_campaign = data._id;
                $scope.saveKeywordsCollection(data);
              })
          }

        })
        .catch(function(errors){
          $scope.errors = errors;
          //console.log(errors);
      }).finally(function(data){
        //console.log('got');
    });
   }

  }]);
