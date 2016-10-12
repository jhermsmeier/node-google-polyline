function encode( points ) {

  var values = encode.flatten( points )
  var px = 0, py = 0
  var str = ''

  for( var i = 0; i < values.length; i += 2 ) {
    str += encode.chars( encode.sign( values[i] - px ) )
    str += encode.chars( encode.sign( values[i + 1] - py ) )
    px = values[i]
    py = values[i + 1]
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
