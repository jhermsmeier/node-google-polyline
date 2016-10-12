var polyline = require( '..' )
var assert = require( 'assert' )

suite( 'Samples', function() {

  suite( '01', function() {

    var data = require( './data/example-01' )

    test( 'encode', function() {
      assert.strictEqual( polyline.encode( data.points ), data.polyline )
    })

    test( 'decode', function() {
      assert.deepEqual( polyline.decode( data.polyline ), data.points )
    })

  })

})
