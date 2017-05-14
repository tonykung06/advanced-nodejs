const fs = require('fs')
const http = require('http')
const server = require('https').createServer({
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem')
})

server.on('request', (req, res) => {
	// clientReq is a writable stream and event emitter, clientReq: http.ClientRequest
	const clientReq = https.request({
		hostname: 'hk.yahoo.com',
		method: 'GET'
	}, result => {
		// result: http.IncomingMessage
		res.writeHead(result.statusCode, result.headers)
		result.on('data', data => {
			console.log(data.toString())
			res.end(data.toString())
		})
	})
	clientReq.on('error', console.log.bind(console))
	console.log(clientReq.agent) // http.Agent
	clientReq.end()
})

server.timeout = 5000
server.listen(8000)

// // simplied by using http.globalAgent
// const req = http.get('http://hk.yahoo.com', res => {
// 	console.log(res.statusCode)
// 	res.on('data', data => {
// 		console.log(data.toString())
// 	})
// })
// req.on('error', console.log.bind(console))
// console.log(req.agent)

