var polyline = require( '..' )
var example = require( '../test/data/example-01' )

suite( 'decode', function() {

  bench( '3 points', function() {
    return polyline.decode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' )
  })

  bench( '~350 points', function() {
    return polyline.decode( example.polyline )
  })

})
