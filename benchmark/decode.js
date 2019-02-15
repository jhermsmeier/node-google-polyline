var bench = require( 'nanobench' )
var polyline = require( '..' )
var example = require( '../test/data/example-01' )

var ITERATIONS = 100000

bench( `decode: 3 points ⨉ ${ITERATIONS}`, function( run ) {

  var result = null

  run.start()

  for( var i = 0; i < ITERATIONS; i++ ) {
    result = polyline.decode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' )
  }

  run.end()

})

bench( `decode: ~350 points ⨉ ${ITERATIONS}`, function( run ) {

  var result = null

  run.start()

  for( var i = 0; i < ITERATIONS; i++ ) {
    result = polyline.decode( example.polyline )
  }

  run.end()

})
