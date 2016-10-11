/**
 * Polyline
 * @constructor
 * @return {Polyline}
 */
function Polyline() {

  if( !(this instanceof Polyline) )
    return new Polyline()

}

/**
 * Polyline prototype
 * @type {Object}
 */
Polyline.prototype = {

  constructor: Polyline,

}

// Exports
module.exports = Polyline
