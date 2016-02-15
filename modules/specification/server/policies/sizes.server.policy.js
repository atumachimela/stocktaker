'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke sizes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/item/:itemId/spec',
      permissions: '*'
    }, {
      resources: '/api/item/:itemId/spec/:specId',
      permissions: '*'
    },
    {
      resources: '/api/item/:itemId/spec/:specId/size',
      permissions: '*'
    },
    {
      resources: '/api/item/:itemId/spec/:specId/size/:sizeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/item/:item/spec',
      permissions: ['get']
    }, {
      resources: '/api/item/:itemId/spec/:specId',
      permissions: ['get']
    },
    {
      resources: '/api/item/:itemId/spec/:specId/size',
      permissions: ['get']
    },
    {
      resources: '/api/item/:itemId/spec/:specId/size/:sizeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Sizes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a size is being processed and the current user created it then allow any manipulation
  if (req.size && req.user && req.size.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
