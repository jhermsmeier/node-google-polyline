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
  var point

  for( var i = 0; i < points.length; i++ ) {
    point = points[i]
    values.push(
      point.lat || point.x || point[0],
      point.lng || point.y || point[1]
    )
  }

  return values

}

encode.sign = function( value ) {
  value = Math.round( value * 1e5 )
  return ( value < 0 ) ? ~( value << 1 ) : ( value << 1 )
}

encode.chars = function( value ) {
  var str = ''
  while( value >= 0x20 ) {
    str += String.fromCharCode( (( value & 0x1F ) | 0x20 ) + 63 )
    value = value >> 5
  }
  str += String.fromCharCode( value + 63 )
  return str
}

module.exports = encode
