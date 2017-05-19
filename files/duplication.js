// server: http.Server
const server = require('http').createServer()

server.on('request', (req, res) => {
	// req: http.IncomingMessage
	// res: http.ServerResponse
	res.writeHead(200, {
		'content-type': 'text/plain'
	})
	// res.end('Hello world\n')
	// if using res.write('Hello world\n'), the client will not know when it streaming is ended and hanging around until default server timeout
	res.write('Hello World\n')
	setTimeout(() => res.write('Another Hello World\n'), 1000)
	setTimeout(() => res.write('Yet Another Hello World\n'), 2000)
})

server.timeout = 5000
server.listen(8000)

