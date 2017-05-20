const {Readable} = require('stream')

// push all data into the readable stream in memory at once
// const inStream = new Readable()
// inStream.push('1234')
// inStream.push(null)

const inStream = new Readable({
	read(size) {
		setTimeout(() => {
			if (this.currentCharCode > 90) {
				this.push(null)
				return
			}
			this.push(String.fromCharCode(this.currentCharCode++))
		}, 100)
	}
})

inStream.currentCharCode = 65

inStream.pipe(process.stdout)

// node readable.js | head -c3
process.on('exit', () => {
	console.error(`\n\ncurrentCharCode is ${inStream.currentCharCode}`)
})
process.stdout.on('error', process.exit)