const util = require('util')
const debuglog = util.debuglog('web123')

const server = require('http').createServer()
server.on('request', (req, res) => {
	debuglog('HTTP Request: %s', req.url)
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	})
	res.end('hi\n')
})

server.listen(8080)

// NODE_DEBUG=web123 node debuglog.js
