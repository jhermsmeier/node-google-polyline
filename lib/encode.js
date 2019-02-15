var PRECISION = 1e5
var CHARCODE_OFFSET = 63
var CHARMAP = {}

for( var i = 0x20; i < 0x7F; i++ ) {
  CHARMAP[ i ] = String.fromCharCode( i )
}

function encode( points ) {

  // px, py, x and y store rounded exponentiated versions of the values
  // they represent to compute the actual desired differences. This helps
  // with finer than 5 decimals floating point numbers.
  var px = 0, py = 0

  return reduce( points, function( str, lat, lon ) {

    var x = Math.round( lat * 1e5 )
    var y = Math.round( lon * 1e5 )

    str += chars( sign( ( x - px ) ) ) +
      chars( sign( ( y - py ) ) )

    px = x
    py = y

    return str

  })

}

function reduce( points, callback ) {

  var point = null

  var lat = 0
  var lon = 0
  var str = ''

  for( var i = 0; i < points.length; i++ ) {
    point = points[i]
    lat = point.lat || point.x || point[0]
    lon = point.lng || point.y || point[1]
    str = callback( str, lat, lon )
  }

  return str

}

function sign( value ) {
  return ( value < 0 ) ? ~( value << 1 ) : ( value << 1 )
}

function charCode( value ) {
  return (( value & 0x1F ) | 0x20 ) + 63
}

function chars( value ) {

  var str = ''

  while( value >= 0x20 ) {
    str += CHARMAP[ charCode( value ) ]
    value = value >> 5
  }

  str += CHARMAP[ value + 63 ]

  return str

}

module.exports = encode
