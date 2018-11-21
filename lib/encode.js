var PRECISION = 1e5
var CHARCODE_OFFSET = 63

function encode( points ) {

  var values = encode.flatten( points )
  // px, py, x and y store rounded exponentiated versions of the values
  // they represent to compute the actual desired differences. This helps
  // with finer than 5 decimals floating point numbers.
  var px = 0, py = 0
  var x = 0, y = 0
  var str = ''

  for( var i = 0; i < values.length; i += 2 ) {
    x = Math.round( values[i] * 1e5 )
    y = Math.round( values[i + 1] * 1e5 )
    str += encode.chars( encode.sign( (x - px) / 1e5 ) )
    str += encode.chars( encode.sign( (y - py) / 1e5 ) )
    px = x
    py = y
  }

  return str

}

encode.flatten = function( points ) {

  var values = []
  var point = null

  var lat = 0
  var lon = 0

  for( var i = 0; i < points.length; i++ ) {
    point = points[i]
    lat = point.lat || point.x || point[0]
    lon = point.lng || point.y || point[1]
    values.push( lat, lon )
  }

  return values

}

encode.sign = function( value ) {
  value = Math.round( value * PRECISION )
  return ( value < 0 ) ? ~( value << 1 ) : ( value << 1 )
}

encode.charCode = function( value ) {
  return (( value & 0x1F ) | 0x20 ) + CHARCODE_OFFSET
}

encode.chars = function( value ) {

  var str = ''

  while( value >= 0x20 ) {
    str += String.fromCharCode( encode.charCode( value ) )
    value = value >> 5
  }

  str += String.fromCharCode( value + CHARCODE_OFFSET )

  return str

}

module.exports = encode
