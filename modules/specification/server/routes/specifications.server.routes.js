'use strict';

/**
 * Module dependencies.
 */
var specificationsPolicy = require('../policies/specifications.server.policy'),
    sizesPolicy = require('../policies/sizes.server.policy'),
    specifications = require('../controllers/specifications.server.controller'),
    sizes = require('../controllers/sizes.server.controller');

    // items = require('../modules/item/server/controllers/item.server.controller');


module.exports = function (app) {
  // Specification collection routes
  app.route('/api/item/:itemId/spec')
    .get(specifications.list)
    .post(specifications.create);

  // Single specification routes
  app.route('/api/item/:itemId/spec/:specId')
    .get(specifications.read)
    .put(specifications.update)
    .delete(specifications.delete);

    // Specification name size collection routes
  app.route('/api/item/:itemId/spec/:specId/size')
    .get(sizes.list)
    .post(sizes.create);

  // Single specification size routes
  app.route('/api/item/:itemId/spec/:specId/size/:sizeId')
    .get(sizes.read)
    .put(sizes.update)
    .post(sizes.withdrawFromSpec)
    .delete(sizes.delete);

  // Finish by binding the specification and item middleware
  app.param('sizeId', sizes.sizeByID);
  app.param('specId', specifications.specByID);
  app.param('itemId', specifications.itemByID);

};  



