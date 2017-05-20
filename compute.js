const longComputation = () => {
	let sum = 0
	for (let i = 0; i < 1000; i++) {
		sum += i
	}
	return sum
}

process.on('message', () => {
	process.send(longComputation())
})