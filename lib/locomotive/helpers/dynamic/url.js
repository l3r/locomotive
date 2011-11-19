/**
 * Module dependencies.
 */
var url = require('url')
  , inflect = require('../../inflect');


/**
 * Generate a URL based on the `options` provided.
 *
 * When generating a route to a controller and action, the path will be
 * generated based on the routing pattern.  Any placeholders in the pattern
 * will be substitued with the corresponding value in `options`.
 *
 * Options:
 *  - `controller`  target controller for URL
 *  - `action`      target action for URL
 *
 * For additional options, see `url.format()` in Node's standard library, as
 * `urlFor` uses it internally.
 *
 * Common Options for `url.format()`:
 *  - `protocol`
 *  - `host`
 *  - `pathname`
 *
 * @param {Object} options
 * @return {String}
 * @api public
 */
function urlFor(req, res) {
  
  return function(options) {
    options = options || {};
    options.controller = inflect._controllerize(options.controller) || req.controller;
    options.action = inflect._actionize(options.action) || req.action;
    
    var urlObj = options;
    if (!options.pathname) {
      var app = req.locomotive;
      var route = app._routes._find(options.controller, options.action)
      options.pathname = route.path(options);
    }
    
    return url.format(urlObj);
  }
}


exports.urlFor = urlFor;