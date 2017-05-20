const fs = require('fs')
const server = require('http').createServer()
server.on('request', (req, res) => {
	// this will buffer the whole big file in memory before writing it out
	// fs.readFile('./big.txt', (err, data) => {
	// 	if (err) {
	// 		throw err
	// 	}
	// 	res.end(data)
	// })

	const src = fs.createReadStream('./big.txt')
	src.pipe(res)
})

server.listen(8000)
