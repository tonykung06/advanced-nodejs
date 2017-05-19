const util = require('util')
const EventEmitter = require('events')

function CustomEmitter() {}

util.inherits(CustomEmitter, EventEmitter)

CustomEmitter.prototype.write = function(data) {
	this.emit('data', data)
}

// ES6
class CustomEmitter2 extends EventEmitter {
	constructor() {
		super()
	}
	write(data) {
		this.emit('data', data)
	}
}
