const dns = require('dns')

// using libuv to resort to OS
dns.lookup('hk.yahoo.com', (err, address) => {
	console.log(address)
})

// making DNS lookup via networking
dns.resolve4('hk.yahoo.com', (err, address) => {
	console.log(address)
})

dns.resolve('hk.yahoo.com', 'MX', (err, address) => {
	console.log(address)
})

dns.resolveMx('hk.yahoo.com', (err, address) => {
	console.log(address)
})

dns.reverse('106.10.178.36', (err, hostnames) => {
	console.log(hostnames)
})

