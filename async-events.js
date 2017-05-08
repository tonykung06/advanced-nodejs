const fs = require('fs')
const EventEmitter = require('events')

// to catch all unhandled error
process.once('uncaughtException', err => {
	console.error(err)
	// do some cleanup
	process.exit(1) // exit anyway
})

class WithTime extends EventEmitter {
	execute(asyncFunc, ...args) {
		console.time('execute')
		this.emit('begin')
		asyncFunc(...args, (err, data) => {
			if (err) {
				return this.emit('error', err)
			}
			this.emit('data', data)
			console.timeEnd('execute')
			this.emit('end')
		})
	}
}

const withTime = new WithTime()
withTime.on('data', data => console.log(data.toString('utf8')))
withTime.prependListener('data', data => console.log('prepended listener on data event'))
withTime.on('error', err => console.error('handling error: ', err))
withTime.on('begin', () => console.log('About to execute'))
withTime.on('end', () => console.log('Done with execute'))
withTime.execute(fs.readFile, __filename)
withTime.execute(fs.readFile, '')

// withTime.removeListener()
