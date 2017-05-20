process.on('message', msg => {
	console.log(`Message from parent: ${JSON.stringify(msg)}`)
})

let counter = 0

setInterval(() => {
	process.send({
		counter: counter++
	})
}, 1000)

