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
 * add a size an Item specification name 
 */

exports.create = function(req, res) {
  console.log('user', req.user);
   Size.findOne({size: req.body.nomber}).exec(function(err, size){      
      if(size){
        return res.status(400).send({
        message: 'Specification name with that size already exist'
        });
      } else if(!size){
        size = new Size(req.body);
        size.user = req.user;
        size.item = req.item;
        size.specName = req.specName;
        size.save(function(err) {
        if (err) {
          return res.status(400).send({
              message: 'unable to save specified size'
          });
        } else {
          res.jsonp(size);
        }
  });
      }
  }); 
};


/**
 * Show the current specification
 */
exports.read = function(req, res) {
  res.jsonp(req.size);
};

/**
 * Update a specification
 */
exports.update = function(req, res) {
  var size = req.size;

  size = _.extend(size, req.body);

  size.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(size);
    }
  });
};

/**
 * Delete a specification
 */
exports.delete = function(req, res) {
  var size = req.size;
  size.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(size);
    }
  });
};
/**
 * List of all Sizes for a particular specification for the user
 */
exports.list = function(req, res) {
  var item = req.item,
      spec = req.specName,
      size = req.size;
      console.log(spec._id);
  Size.findById(req.params.specId).sort('-created').populate('user', 'displayName').exec(function(err, sizes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sizes);
    }
  });
};

/**
 * Sizes middlewares
 */

/**
/***** make a withdrawal of a particular specification of an item*
withdraw from spec
 */

 exports.withdrawFromSpec = function(req, res){
  var currentSize = req.params.sizeId;
  console.log('params', currentSize);
  var stockInit = req.size.stockInit;
  console.log('req', req.size.stockInit);
  var amountWithdrawn = req.body.withdrawal;
  console.log('withdrawal', amountWithdrawn);
  // subtract amountWithdwan from stockInit 
  var currentStock = stockInit - amountWithdrawn;
  console.log('current stock', currentStock);
  req.size.stockNow = currentStock;
  req.size.save(function(err){
    if (err) {
          return res.status(400).send({
              message: 'unable to save withdrawal'
          });
        } else {
        console.log('currentStock', req.size.stockNow);
          res.jsonp(req.size);
        }
  });
 };

  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'proserviceinventory@gmail.com',
          pass: '@regina123'
      }
  });

/** send email****/
var determineFunc = function(req, res) {
  
    Size.find().exec(function(err, size){
    if (err) {
          return res.send({
        message: 'Noting found'
          });
      } else {
          console.log('1', size);
          _.forEach(size, function(sizes, key){
          console.log('Init', sizes.stockInit);
          console.log('Now', sizes.stockNow);
            // if(sizes.stockNow < 7 && sizes.stockNow !== 0) {
              // sendMail();
              Item.findOne({item: Item._id}).exec(function(err, item){
              console.log('item', item);
              console.log('nows', sizes.stockNow);
                Specification.findOne({spec: Specification._id}).exec(function(err, spec){
                console.log('spec', spec);  
              if (sizes.stockInit <= 500){  
                var Message = {
                  ItemName : item.itemName,
                  SpecType : spec.specType,
                  SpecTitle : spec.title,
                  Color : spec.color,
                  Nomber : sizes.nomber,
                  StockInit : sizes.stockInit,
                  StockNow : sizes.stockNow,
                  Unit: sizes.units
                };
                  console.log('messeage', Message);
                  transporter.sendMail({
                  from: 'proserviceinventory@gmail.com',
                  to: 'proserviceinventory@gmail.com',
                  subject: 'Re-Stock Alert',
                  text:'Please' + '\t' + 'only' + '\t' + Message.StockNow+'\t' + Message.Unit + '\t' + 'of' + '\t' + Message.Color +'\t'+ Message.SpecType + '\t' + Message.SpecTitle + '\t'+ Message.ItemName + '\t' + ', size' + '\t' + Message.Nomber
                });
              }
              if (sizes.stockInit === 0){
                    var Message = {
                      ItemName: item.itemName,
                      SpecType: spec.specType,
                      SpecTitle: spec.title,
                      Nomber: sizes.nomber,
                      Color: spec.color,
                    }
                  transporter.sendMail({
                    from: 'proserviceinventory@gmail.com',
                    to: 'proserviceinventory@gmail.com',
                    subject: 'Zero-Stock Alert',
                    text:'Please' + '\t' + 'Re-Stock' + '\t' + Message.StockNow+'\t' + Message.Unit + '\t' + 'of' + '\t' + Message.Color +'\t'+ Message.SpecType + '\t' + Message.SpecTitle + '\t'+ Message.ItemName + '\t' + ', size' + '\t' + Message.Nomber   
                });
              }
              });
            });
          });
      }
  });
};
  determineFunc();

exports.specByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Item specification name is invalid'
    });
  }
  Specification.findById(req.params.specId).populate('user', 'displayName').populate('item', 'itemName').exec(function(err, specName) {
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
exports.sizeByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Size is invalid'
    });
  }
  Size.findById(req.params.sizeId).populate('user', 'displayName')
  .populate('item', 'itemName').populate('specName', 'title').exec(function (err, size) {
    if (err) return next(err);
    if (!size) {
      return res.status(404).send({
        message: 'No item with that Size has been found'  
      });
    }
    req.size = size;
    next();
  });
};
/**
 * specification authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  console.log('sizeId', req.size.user.id);
  console.log('userId', req.user.id);
  if (req.size.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
