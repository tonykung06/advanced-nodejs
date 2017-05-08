const EventEmitter = require('events')

class Server extends EventEmitter {
	constructor(client) {
		super()
		this.tasks = []
		this.taskId = 1
		process.nextTick(() => {
			this.emit('response', 'Type a command (help to list commands)')
		})

		// help, add, ls, delete
		client.on('command', (command, ...args) => {
			if (this[command]) {
				this[command](args)
			} else {
				this.emit('response', `unknown command`)
			}
		})
	}

	tasksString() {
		return Object.keys(this.tasks).map(k => `${k}: ${this.tasks[k]}`).join('\n')
	}

	help() {
		this.emit('response', `
			Available commands:
			1. add <task>
			2. ls
			3. delete <task id>
		`)
	}

	ls() {
		this.emit('response', `Tasks:\n${this.tasksString()}`)
	}

	delete(args) {
		delete this.tasks[args[0]]
		this.emit('response', `Deleted task ${args[0]}`)
	}

	add(args) {
		this.tasks[this.taskId] = args.join(' ')
		this.emit('response', `Added task ${this.taskId}`)
		this.taskId++
	}
}

module.exports = client => new Server(client)
