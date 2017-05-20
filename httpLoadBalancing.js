const http = require('http')
const pid = process.pid

let usersCount;

http.createServer((req, res) => {
	for (let i = 0; i < 10000; i++) {}
	res.write(`Handled by process ${pid}\n`)
	res.end(`Users: ${usersCount}`)
}).listen(8080, () => {
	console.log(`Started process ${pid}`)
})

process.on('message', msg => {
	if (typeof msg === 'string') {
		console.log(`Message from master: ${msg}`)
	} else {
		usersCount = msg.usersCount
	}
})

// // simulating random crash
// setTimeout(() => {
// 	process.exit(1)
// }, Math.random() * 10000)
