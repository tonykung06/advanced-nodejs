const util = require('util')

const puts = () => {
	console.log('hi')
}

// the users of this method will get the deprecation msg at the first this method is called
module.exports.puts = util.deprecate(puts, 'puts method is deprecated')
