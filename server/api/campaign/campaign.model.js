'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  name: String,
  domain: String,
  searchengine_id: Number,
  keyword_collection: Number
});

module.exports = mongoose.model('Campaign', CampaignSchema);
