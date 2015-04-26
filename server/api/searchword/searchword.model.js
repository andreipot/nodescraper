'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchwordSchema = new Schema({
  keyword :  String,
  campaign_id: Number,
  searchengine_id: Number,
  response : String
});

module.exports = mongoose.model('Searchword', SearchwordSchema);
