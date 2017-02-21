// process is an event emitter

process.on('exit', code => {
	// do one final synchronous operation
	// before the node process terminates
	// can only do sync operations here
	console.log(`About to exit with code: ${code}`);
});

// if no handler is registered, by default, node will print the stack trace and exit
// once a handler is registered, node will not exit
process.on('uncaughtException', err => {
	// any unhandled js exceptions
	// do cleanup and manually exit anyway, then let process manager/monitor to restart the process
	console.error(err);

	// FORCE exit the process
	process.exit(1);
});

// keep the event loop busy
process.stdin.resume();

console.undefinedMethod();