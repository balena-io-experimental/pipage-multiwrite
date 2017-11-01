var Stream = require( 'stream' )
var speedometer = require( 'speedometer' )

class ProgressStream extends Stream.Transform {

  constructor(options) {

    super(options)

    this.start = 0
    this.interval = options.time || 500
    this.timer = null
    this.meter = speedometer()

    this.delta = 0

    this.state = {
      delta: 0,
      eta: 0,
      length: options.length,
      percentage: 0,
      remaining: 0,
      runtime: 0,
      speed: 0,
      transferred: 0,
    }

    this.clear = () => {
      clearInterval( this.timer )
    }

    this.update = () => {
      this.state.delta = this.delta
      this.state.transferred += this.delta
      this.state.percentage = this.state.transferred / this.state.length * 100
      this.state.remaining = this.state.length - this.state.transferred
      this.state.runtime = Date.now() - this.start
      this.state.speed = this.meter( this.state.delta )
      this.delta = 0
      this.emit( 'progress', this.state )
    }

    this.once( 'end', this.clear )
    this.once( 'end', this.update )
    this.once( 'error', this.clear )

    this.timer = setInterval( this.update, this.interval )

  }

  _transform( chunk, _, next ) {
    this.start = this.start || Date.now()
    this.delta += chunk.length
    next( undefined, chunk )
  }

  _destroy( error, done ) {
    this.clear()
    done( error )
  }

}

module.exports = ProgressStream
