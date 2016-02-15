'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  itemName: {
    type: String,
    default: '',
    trim: true,
    required: 'Item name cannot be blank'
  },
  specifications: {
    type: Schema.ObjectId,
    ref: 'Specification' 
  },
  size: {
    type: Schema.ObjectId,
    ref: 'Size' 
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Item', ItemSchema);
