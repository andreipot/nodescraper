'use strict';

var _ = require('lodash');
var Searchword = require('./searchword.model');
var url = require('url');
var request = require('request');
//var serialize = require('serialize');
// Get list of searchwords
exports.index = function(req, res) {
  Searchword.find(function (err, searchwords) {
    if(err) { return handleError(res, err); }
    return res.json(200, searchwords);
  });
};

// Get a single searchword
exports.show = function(req, res) {
  Searchword.findById(req.params.id, function (err, searchword) {
    if(err) { return handleError(res, err); }
    if(!searchword) { return res.send(404); }
    return res.json(searchword);
  });
};

// Creates a new searchword in the DB.
exports.create = function(req, res) {
  Searchword.create(req.body, function(err, searchword) {
    if(err) { return handleError(res, err); }
    return res.json(201, searchword);
  });
};
exports.serp = function(req, response) {

  var rootURL = 'http://api.domaincrawler.com/v2/serp/live?api_username=XXXXX&api_key=XXXXXXXXXX';

  var params = '&keyword='+req.query.keyword + '&searchengine_id='+req.query.searchengine_id +'&domain='+req.query.domain;
  //var target_URL = rootURL +encodeURIComponent(params);
  var target_URL = rootURL +params;
  //console.log(target_URL);
  request(target_URL, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      //console.log(body) // Show the HTML for the Google homepage.
      response.json(body);
    }
  })

};
// Updates an existing searchword in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Searchword.findById(req.params.id, function (err, searchword) {
    if (err) { return handleError(res, err); }
    if(!searchword) { return res.send(404); }
    var updated = _.merge(searchword, req.body);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, searchword);
    });

  });
};

// Deletes a searchword from the DB.
exports.destroy = function(req, res) {
  Searchword.findById(req.params.id, function (err, searchword) {
    if(err) { return handleError(res, err); }
    if(!searchword) { return res.send(404); }
    searchword.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
