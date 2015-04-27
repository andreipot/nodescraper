'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchwordSchema = new Schema({
  keyword :  String,
  searchengine_id: Number,
  response : String,
  campaign_id:[
    {type: Schema.Types.ObjectId, ref: 'Campaign'}
  ]
});

module.exports = mongoose.model('Searchword', SearchwordSchema);
