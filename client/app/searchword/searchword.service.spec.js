'use strict';

describe('Service: searchword', function () {

  // load the service's module
  beforeEach(module('canApp'));

  // instantiate service
  var searchword;
  beforeEach(inject(function (_searchword_) {
    searchword = _searchword_;
  }));

  it('should do something', function () {
    expect(!!searchword).toBe(true);
  });

});
