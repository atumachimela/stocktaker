'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Specification Schema
 */
var SizeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  nomber: {
    type: Number,
    required: 'must have size',
    unique: true
  },
  stockInit: {
    type: Number,
    min: 0,
    required: 'cannot not be empty'
  },
  units: {
    type: String,
    required: 'must have unit in cartons or packets'
  },
  withdrawal: {
    type: Number
  },
  stockNow: {
    type: Number,
    default: 0,
    min: 0
  },
  specName: {
    type: Schema.ObjectId,
    ref: 'Specification'
  },
  item: {
    type: Schema.ObjectId,
    ref: 'Item'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Size', SizeSchema);
