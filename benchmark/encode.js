var bench = require( 'nanobench' )
var polyline = require( '..' )
var example = require( '../test/data/example-01' )

var ITERATIONS = 100000

bench( `encode: 3 points ⨉ ${ITERATIONS}`, function( run ) {

  var result = null

  run.start()

  for( var i = 0; i < ITERATIONS; i++ ) {
    result = polyline.encode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' )
  }

  run.end()

})

bench( `encode: ~350 points ⨉ ${ITERATIONS}`, function( run ) {

  var result = null

  run.start()

  for( var i = 0; i < ITERATIONS; i++ ) {
    result = polyline.encode( example.points )
  }

  run.end()

})
