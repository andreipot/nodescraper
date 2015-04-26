'use strict';

angular.module('canApp')
  .service('campaign', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  })
.factory('Campaign',function($resource){
    return $resource('/api/campaigns/:id');
  })
.directive('fileChange',['$parse', function($parse){
  return{
    require:'ngModel',
    restrict:'A',
    link:function($scope,element,attrs,ngModel){
      var attrHandler=$parse(attrs['fileChange']);
      var handler=function(e){
        $scope.$apply(function(){
          attrHandler($scope,{$event:e,files:e.target.files});
        });
      };
      element[0].addEventListener('change',handler,false);
    }
  }
}])
.filter('csvToObj',function(){
  return function(input){
    var rows=input.split('\n');
    var obj=[];
    angular.forEach(rows,function(val){
      var o=val.split(',');
      obj.push({
        keyword:o[1]
    });
  });
  return obj;
}});

