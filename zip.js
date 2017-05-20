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
	.pipe(zlib.createGzip())
	.pipe(crypto.createCipher('aes192', 'my_secret'))
	// .on('data', () => process.stdout.write('.'))
	.pipe(progress)
	.pipe(fs.createWriteStream(`${file}.gz`))
	.on('finish', () => console.log('DONE'))
