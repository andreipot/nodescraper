'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  name: String,
  domain: String,
  searchengine_id: Number,
  created_campaign_id: Number,
  keyword_collection: Number,
  user_id:[
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
});

module.exports = mongoose.model('Campaign', CampaignSchema);
