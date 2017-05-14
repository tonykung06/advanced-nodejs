const server = require('http').createServer()

server.on('request', (req, res) => {
	switch (req.url) {
		case '/api':
			res.writeHead(200, {
				'Content-Type': 'application/json'
			})
			res.end(JSON.stringify({}))
			break
		case '/home':
			res.writeHead(200, {
				'content-type': 'text/plain'
			})
			res.end('Home\n')
			break
		case '/':
			// http.STATUS_CODES
			res.writeHead(301, {
				Location: '/home'
			})
			res.end()
			break
		default:
			res.writeHead(404)
			res.end()
	}
})

server.timeout = 5000
server.listen(8000)
