'use strict';

angular.module('canApp')
  .service('campaign', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  })
.factory('Campaign',function($resource){
    return $resource('/api/campaigns/:id');
  });
