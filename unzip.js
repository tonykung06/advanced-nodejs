const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
const {Transform} = require('stream')
const crypto = require('crypto')

const progress = new Transform({
	transform(chunk, encoding, callback) {
		process.stdout.write('.')
		callback(null, chunk)
	}
})

fs.createReadStream(file)
	.pipe(crypto.createDecipher('aes192', 'my_secret'))
	.pipe(zlib.createGunzip())
	.pipe(progress)
	.pipe(fs.createWriteStream(file.slice(0, -3)))
	.on('finish', () => console.log('DONE'))
