var PRECISION = 1e5

function decode( value ) {

  var points = []
  var lat = 0
  var lon = 0

  var values = decode.integers( value, function( x, y ) {
    lat += x
    lon += y
    points.push([ lat / PRECISION, lon / PRECISION ])
  })

  return points

}

decode.sign = function( value ) {
  return value & 1 ? ~( value >>> 1 ) : ( value >>> 1 )
}

decode.integers = function( value, callback ) {

  var values = 0
  var x = 0
  var y = 0

  var byte = 0
  var current = 0
  var bits = 0

  for( var i = 0; i < value.length; i++ ) {

    byte = value.charCodeAt( i ) - 63
    current = current | (( byte & 0x1F ) << bits )
    bits = bits + 5

    if( byte < 0x20 ) {
      if( ++values & 1 ) {
        x = decode.sign( current )
      } else {
        y = decode.sign( current )
        callback( x, y )
      }
      current = 0
      bits = 0
    }

  }

  return values

}

module.exports = decode
