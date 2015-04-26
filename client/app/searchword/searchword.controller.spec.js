'use strict';

describe('Controller: SearchwordCtrl', function () {

  // load the controller's module
  beforeEach(module('canApp'));

  var SearchwordCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchwordCtrl = $controller('SearchwordCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
