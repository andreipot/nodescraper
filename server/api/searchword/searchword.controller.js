'use strict';

var _ = require('lodash');
var Searchword = require('./searchword.model');

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