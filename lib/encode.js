function encode( points ) {

  var values = encode.flatten( points )
  var px_e5 = 0, py_e5 = 0
  var str = ''

  for( var i = 0; i < values.length; i += 2 ) {
    var x_e5 = Math.round( values[i] * 1e5 )
    var y_e5 = Math.round( values[i + 1] * 1e5 )
    str += encode.chars( encode.sign( (x_e5 - px_e5) / 1e5 ) )
    str += encode.chars( encode.sign( (y_e5 - py_e5) / 1e5 ) )
    px_e5 = x_e5
    py_e5 = y_e5
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
