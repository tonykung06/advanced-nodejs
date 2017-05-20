const {exec} = require('child_process')

// exec will buffer the whole output in memory before giving it to the callback function
exec('find ./files -type f | wc -l', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`)
		return
	}
	console.log(`Number of files ${stdout}`)
})
