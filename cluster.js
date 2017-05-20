const cluster = require('cluster')
const os = require('os')

// simulating making a DB call to get number of users in DB
const numberOfusersInDB = () => {
	this.count = this.count || 5
	this.count = this.count * this.count
	return this.count
}

const updateWorkers = () => {
	// broadcasting the updated number of users to all workers
	const usersCount = numberOfusersInDB()
	Object.values(cluster.workers).forEach(worker => {
		worker.send({
			usersCount
		})
	})
}

cluster.on('exit', (worker, code, signal) => {
	// exitedAfterDisconnect means admin killed a worker explicitly
	if (code !== 0 && !worker.exitedAfterDisconnect) {
		console.log(`Worker ${worker.id} crashed. Starting a new worker...`)
		cluster.fork()
	}
})

// user signal by `kill -SIGUSR2 PID`
process.on('SIGUSR2', () => {
	const workers = Object.values(cluster.workers)
	const restartWorker = workerIndex => {
		const worker = workers[workerIndex]
		if (!worker) {
			return
		}
		worker.on('exit', () => {
			if (!worker.exitedAfterDisconnect) {
				return
			}
			cluster.fork().on('listening', () => {
				restartWorker(workerIndex + 1)
			})
		})
		worker.disconnect()
	}
	// restarting worker process one by one
	restartWorker(0)
})

if (cluster.isMaster) {
	const cpus = os.cpus().length
	console.log(`Forking for ${cpus} CPUs`)
	for (let i = 0; i < cpus; i++) {
		// using child_process.fork API under the hood
		cluster.fork()
	}
	console.dir(cluster.workers, {
		depth: 0
	})
	Object.values(cluster.workers).forEach(worker => {
		worker.send(`Hello Worker ${worker.id}`)
	})
	updateWorkers()
	setInterval(updateWorkers, 10000)
} else {
	require('./httpLoadBalancing')
}

