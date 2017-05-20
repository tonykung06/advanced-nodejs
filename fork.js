const http = require('http')

const server = http.createServer()
server.on('request', (req, res) => {
	if (req.url === '/compute') {
		// const sum = longComputation()
		// return res.end(sum)
		const compute = fork('compute.js')
		compute.on('message', result => {
			res.end(result)
		})
		compute.send('START')
	}
	res.end('OK')
})

server.listen(3000)

