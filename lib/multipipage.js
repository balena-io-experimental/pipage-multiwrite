var fs = require( 'fs' )
var mountutils = require( 'mountutils' )
var async = require( 'async' )
var debug = require( 'debug' )( 'multipipage' )
var ImageWriter = require( './image-writer' )

function createWriter( options ) {

  var imageSize = fs.statSync( options.imagePath ).size
  var writer = new ImageWriter({
    image: {
      stream: fs.createReadStream( options.imagePath ),
      size: {
        original: imageSize,
        final: {
          estimation: false,
          value: imageSize,
        },
      },
    },
    fd: options.deviceFd,
    path: options.devicePath,
    flags: 'rs+',
    verify: !!options.validate,
    checksumAlgorithms: options.checksums || [],
  })

  return writer

}

function childMode( options, callback ) {

  var writer = createWriter({
    imagePath: options.imagePath,
    deviceFd: null,
    devicePath: options.device,
    verify: options.verify,
    checksums: options.checksums,
  })

  debug( 'unmounting "%s"', device )

  mountutils.unmountDisk( device.replace('rdisk','disk'), ( error ) => {
    debug( 'unmounted "%s": %s', device, error ? error.message : 'OK' )
    if( error ) return callback( error, writer )
    callback( null, writer )
  })

}

function singleMode( options, callback ) {

  async.map( options.devices, ( device, nextDevice ) => {

    var writer = createWriter({
      imagePath: options.imagePath,
      deviceFd: null,
      devicePath: device,
      verify: options.verify,
      checksums: options.checksums,
    })

    // writer.on( 'error' )
    // writer.on( 'finish' )
    // writer.on( 'progress' )

    debug( 'unmounting "%s"', device )

    mountutils.unmountDisk( device.replace('rdisk','disk'), ( error ) => {
      debug( 'unmounted "%s": %s', device, error ? error.message : 'OK' )
      if( error ) return nextDevice( error, writer )
      nextDevice( null, writer )
    })

  }, ( error, writers ) => {
    callback( error, writers )
  })

}

module.exports.childMode = childMode
module.exports.singleMode = singleMode
