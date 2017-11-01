var util = require( 'util' )
var options = {
  colors: process.stdout.isTTY,
  depth: null
}

function inspect( value ) {
  return util.inspect( value, options )
}

inspect.print = function( value ) {
  process.stdout.write( inspect( value ) )
  process.stdout.write( '\n' )
}

module.exports = inspect
