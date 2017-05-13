const server = require('net').createServer()

// every client connection will have a new socket
let socketCounter = 0
let sockets = {}
server.on('connection', socket => {
	socket.id = ++socketCounter

	console.log('Client connected')
	socket.write('Please type your name: ')

	// globally set to utf8 encoding
	// socket.setEncoding('utf8')

	// if there is no global encoding configured, data is buffer object(no encoding)
	socket.on('data', data => {
		if (!sockets[socket.id]) {
			socket.name = data.toString().trim()
			socket.write(`Welcome ${socket.name}!`)
			sockets[socket.id] = socket
			return
		}

		// broadcast to all sockets
		Object.entries(sockets).forEach(([key, clientSocket]) => {
			if (key === socket.id) {
				return
			}
			clientSocket.write(`${socket.id} ${timestamp()}: `)
			clientSocket.write(data, 'utf8')
		})
	})

	socket.on('end', () => {
		delete sockets[socket.id]
		console.log('Client discounnected')
	})
})

function timestamp() {
	const now = new Date()
	return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

server.listen(8000, () => console.log('Server is running'))
