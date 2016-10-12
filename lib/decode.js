function decode( value ) {
  return decode.integers( value )
    .map( decode.signs )
    .map( decode.deltas )
    .map( decode.floats )
    .reduce( decode.points, [])
}

decode.points = function( points, value, i, values ) {
  if( ( i + 1 ) % 2 === 0 )
    points.push([ values[ i - 1 ], value ])
  return points
}

decode.deltas = function( value, i, values ) {
  return values[i] = ( i >= 2 ) ?
    values[ i - 2 ] + value :
    value
}

decode.floats = function( value ) {
  return value / 1e5
}

decode.signs = function( value ) {
  return value & 1 ? ~( value >>> 1 ) : ( value >>> 1 )
}

decode.integers = function( value ) {

  var values = []
  var byte = 0
  var current = 0
  var bits = 0

  for( var i = 0; i < value.length; i++ ) {

    byte = value.charCodeAt( i ) - 63
    current = current | (( byte & 0x1F ) << bits )
    bits = bits + 5

    if( byte < 0x20 ) {
      values.push( current )
      current = 0
      bits = 0
    }

  }

  return values

}

module.exports = decode
