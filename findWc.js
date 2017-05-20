const {spawn} = require('child_process')

const find = spawn('find', ['./files', '-type', 'f'])
const wc = spawn('wc', ['-l'])

find.stdout.pipe(wc.stdin)

wc.stdout.on('data', data => {
	console.log(`Number of files:\n${data}`)
})
