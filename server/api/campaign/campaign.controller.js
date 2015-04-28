'use strict';

var _ = require('lodash');
var http = require('http');
var request = require('request');
var Campaign = require('./campaign.model');

// Get list of campaigns
exports.index = function(req, res) {

  Campaign.find(function (err, campaigns) {
    if(err) { return handleError(res, err); }
    return res.json(200, campaigns);
  });
};

// Get a single campaign
exports.show = function(req, res) {
  Campaign.findById(req.params.id, function (err, campaign) {
    if(err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }
    return res.json(campaign);
  });
};

// Creates a new campaign in the DB.
exports.create = function(req, res) {
  Campaign.create(req.body, function(err, campaign) {

    if(err) { return handleError(res, err); }



    return res.json(201, campaign);
  });
};

exports.searchengines = function(req, response) {

  var rootURL = 'http://api.domaincrawler.com/v2/searchengines?api_username=cem@copypanthers.com&api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';

  request(rootURL, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
      response.json(body.toString('utf8'));
    }
  })
};
exports.createcampaign = function(req, response) {

  var rootURL = 'http://api.domaincrawler.com/v2/campaigns?api_username=cem@copypanthers.com&api_key=4adca9f52d8719155f9c898a2b8c38da56364e48';
  console.log(req.body);
  var payload = {
    name          : req.body.name,
    searchengine_id: req.body.searchengine_id
  };

  request.post({url:rootURL, form: payload}, function(err,res,body){
    //output data;
    if (err) {
      return console.error('upload failed:', err);
    }
   // if (!err && res.statusCode == 200) {
      console.log('Upload successful!  Server responded with:', body);
      response.json(body.toString('utf8'));
   // }
  })

};

// Updates an existing campaign in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Campaign.findById(req.params.id, function (err, campaign) {
    if (err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }
    var updated = _.merge(campaign, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, campaign);
    });
  });
};

// Deletes a campaign from the DB.
exports.destroy = function(req, res) {
  Campaign.findById(req.params.id, function (err, campaign) {
    if(err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }
    campaign.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
