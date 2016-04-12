'use strict';

 /**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
  	Specification = mongoose.model('Specification'),
  	Item = mongoose.model('Item'),
    Size = mongoose.model('Size'),
  	_ = require('lodash'),
    nodemailer = require("nodemailer"),
 	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a a specification for an Item
 */

exports.create = function(req, res) {
  
   Specification.findOne({name: req.body.title}).exec(function(err, specName){    	
      if(specName){
        return res.status(400).send({
        message: 'Specification with that name already exist'
        });
      } else if(!specName){
      	specName = new Specification(req.body);
      	specName.user = req.user;
      	specName.item = req.item;
        specName.save(function(err) {
        if (err) {
          return res.status(400).send({
              message: 'unable to save specification'
          });
        } else {
          res.jsonp(specName);
        }
      });
      }
  }); 
};

/**
 * Show the current specification
 */
exports.read = function(req, res) {
  res.jsonp(req.specName);
};

/**
 * Update a specification
 */
exports.update = function(req, res) {
  var spec = req.specName;

  spec = _.extend(spec, req.body);

  spec.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(spec);
    }
  });
};

/**
 * Delete a specification
 */
exports.delete = function(req, res) {
  var spec = req.specName;
  spec.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(spec);
    }
  });
};
/**
 * List of Specifications for the user
 */
exports.list = function(req, res) {
  var item = req.item;
  Specification.find({item: item}).sort('-created').populate('user', 'displayName').exec(function(err, specs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specs);
    }
  });
};




/**
 * specification middlewares
 */


exports.specByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Item specification name is invalid'
    });
  }
  Specification.findById(req.params.specId).populate('user', 'displayName').exec(function(err, specName) {
    if (err) return next(err);
    if (!specName) {
      return res.status(404).send({
        message: 'No item specification  name with that identifier has been found' 
      });
    }
    req.specName = specName;
    next();
  });
};

exports.itemByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Item is invalid'
    });
  }
  Item.findById(req.params.itemId).populate('user', 'displayName')
  .exec(function (err, item) {
    if (err) return next(err);
    if (!item) {
      return res.status(404).send({
        message: 'No item with that identifier has been found' 
      });
    }
    req.item = item;
    next();
  });
};
/**
 * specification authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.spec.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
