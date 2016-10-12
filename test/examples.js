var polyline = require( '..' )
var assert = require( 'assert' )

suite( 'Google Polyline Example', function() {

  test( 'encode', function() {

    var points = [
      [ 38.5, -120.2 ],
      [ 40.7, -120.95 ],
      [ 43.252, -126.453 ]
    ]

    var encoded = polyline.encode( points )

    assert.equal( encoded, '_p~iF~ps|U_ulLnnqC_mqNvxq`@' )

  })

  test( 'decode', function() {

    var points = polyline.decode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' )
    var decoded = [
      [ 38.5, -120.2 ],
      [ 40.7, -120.95 ],
      [ 43.252, -126.453 ]
    ]

    assert.deepEqual( points, decoded )

  })

})
