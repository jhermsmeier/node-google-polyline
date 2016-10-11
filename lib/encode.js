function encode( points ) {

  points = points.map( encode.points )
    .map( encode.deltas )

  points.forEach( encode.round )
  points.forEach( encode.sign )

  return encode.flatten( points )
    .reduce( encode.chars, '' )

}

encode.points = function( point ) {
  return [
    point.lat || point.x || point[0],
    point.lng || point.y || point[1]
  ]
}

encode.deltas = function( point, i, points ) {
  return ( i === 0 ) ? point : [
    points[i][0] - points[ i - 1 ][0],
    points[i][1] - points[ i - 1 ][1]
  ]
}

encode.round = function( point ) {
  point[0] = Math.round( point[0] * 1e5 )
  point[1] = Math.round( point[1] * 1e5 )
  return point
}

encode.sign = function( point ) {
  point[0] = ( point[0] < 0 ) ? ~( point[0] << 1 ) : ( point[0] << 1 )
  point[1] = ( point[1] < 0 ) ? ~( point[1] << 1 ) : ( point[1] << 1 )
  return point
}

encode.flatten = function( points ) {

  var values = []

  for( var i = 0; i < points.length; i++ ) {
    values.push( points[i][0], points[i][1] )
  }

  return values

}

encode.chars = function( str, value ) {
  while( value >= 0x20 ) {
    str += String.fromCharCode( (( value & 0x1F ) | 0x20 ) + 63 )
    value = value >> 5
  }
  str += String.fromCharCode( value + 63 )
  return str
}

module.exports = encode
