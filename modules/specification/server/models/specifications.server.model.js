'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Specification Schema
 */
var SpecificationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'category cannot be blank'
  },
  color: {
    type: String,
    required: 'Color is very important'
  },
  specType: {
    type: String,
    required: 'specify type'
  },
  item: {
    type: Schema.ObjectId,
    ref: 'Item'
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

mongoose.model('Specification', SpecificationSchema);
