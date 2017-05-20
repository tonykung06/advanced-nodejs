const fs = require('fs')
const loremIpsum = require('lorem-ipsum')
const file = fs.createWriteStream('./big.txt')

for (let i = 0; i <= 100; i++) {
	file.write(loremIpsum())
}

file.end()