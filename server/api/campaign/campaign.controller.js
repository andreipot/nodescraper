'use strict';

var _ = require('lodash');
var http = require('http');
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

exports.dosomething = function(req, response) {
  var url ='api.domaincrawler.com';
  var options = {
    host: url,
    path: '/v2/searchengines?api_username=cem@copypanthers.com&api_key=4adca9f52d8719155f9c898a2b8c38da56364e48',
    method: 'get'
  };
  console.log('in node');
  var req = http.get(options, function(res) {
  //  console.log('STATUS: ' + res.statusCode);
  //  console.log('HEADERS: ' + JSON.stringify(res.headers));
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      console.log('BODY: ' + body);
      response.json(body.toString('utf8'));
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
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
