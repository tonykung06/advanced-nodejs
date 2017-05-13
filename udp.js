const dgram = require('dgram')
const PORT = 3333
const HOST = '127.0.0.1'

// Server
const server = dgram.createSocket('udp4')

server.on('listening', () => console.log('UDP server is listening'))
server.on('message', (msg, remoteInfo) => {
	console.log(`${remoteInfo.address}:${remoteInfo.port} = ${msg}`)
})

server.bind(PORT, HOST)

setInterval(() => {
	const client = dgram.createSocket('udp4')
	const msg = Buffer.from('hello')
	client.send(msg, 0, 2 PORT, HOST, err => {
		if (err) {
			throw err
		}
		client.send(msg, 2, 3, PORT, HOST, err => {
			if (err) {
				throw err
			}	
			console.log('UDP message has been sent')
			client.close()
		})
	})
}, 1000)
