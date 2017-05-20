const {spawn} = require('child_process')

// const child = spawn('pwd')
const child = spawn('find', ['./files', '-type', 'f'])

child.stdout.on('data', data => {
	console.log(`child stdout:\n${data}`)
})

child.stderr.on('data', data => {
	console.error(`child stderr:\n${data}`)
})

child.on('exit', (code, signal) => {
	console.log(`child process exited with code ${code}, signal ${signal}`)
})

// other events on child:
// 1. disconnect, when the parent process explicitly calls child.disconnect()
// 2. error, when the child process cannot be spawned or is killed
// 3. message, when the child process does process.send()
// 4. close, when standard IO streams of the child process get closed
// stdio objects: child.stdin, child.stdout, child.stderr

// // simpler alternative
// const child = spawn('find', ['./files', '-type', 'f'], {
// 	stdio: 'inherit'
// })

// const child = spawn('find ./files -type f'], {
// 	stdio: 'inherit',
// 	shell: true,
// 	cwd: 'C:/Users/Admin/Downloads',
// 	env: Object.assign({}, process.env, {
// 		testing: 'testing'
// 	})
// })

// const child = spawn('node', ['timer.js'], {
// 	detached: true, // make the child process the leader of a new process group and session
// 	stdio: 'ignore'
// })
// child.unref() // the parent process can exit independently of the child, the child keep running in the background
