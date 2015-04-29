'use strict';

angular.module('canApp')
  .service('searchword', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  }).factory('Searchword',function($resource){
   // return $resource('/api/searchwords/:id');
    return $resource('/api/searchwords/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    }, {
      stripTrailingSlashes: false
    });
  });
