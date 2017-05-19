### CLI
- `node -p process.versions.v8`
- `node -p process.versions`
- `node -p process.env`
- `node -p process.arch`
- `node -p process.release.lts`
- `node -p os.cpus()`
- `node --harmony -p "'Node'.padEnd(8, '*')"`
- `node --v8-options | grep "in progress"`
- `node --v8-options | grep "gc"`
- `node --trace_gc <js file>`
- `node --expose-gc -i "gc()"`
- `node --v8-options | less`
- `node --harmony_trailing_commas -p "function tc(a,b,) {}"`
- `node --use_strict <js file>`
- `node -p "process.argv.slice(1)" test 42`
- `NODE_NO_READLINE=1 rlwrap node`
- REPL `.help`
- `require.resolve('moduleA')` will resolve the path to the module file but don't load the module
- `require.extensions['.js'].toString()`, `require.extensions['.json'].toString()`, `require.extensions['.node'].toString()`
- Before compilinig a module, Node wraps the module code in a function, `require('module').wrapper`, `console.log(arguments)`
- modules are cached after first load, `console.log(require.cache)`, `delete require.cache[<full path to module>]` will clear the module cache and next require() of that module will re-evaluate the module code
- To generate cert, private key, CSR, and self-signed cert in one go, `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes`
- `url.parse('https://user:pass@hk.yahoo.com/path/a?myq=testing#testing', true)`
- `url.format({protocol: 'https', host: 'hk.yahoo.com', search: '?q=testing', pathname: '/search'})`
- `querystring.parse(querystring.stringify({q: 'testing', q2: 'hello'}))`
- `require('os').cpus()`
- `require('os').networkInterfaces()`
- `require('os').freemem()`
- `require('os').type()`
- `require('os').release()`
- `require('os').userInfo()`
- `require('os').constants`
- `util.inspect(module, {depth: 0})`, to print string representation of an object
- `console.assert(3 == '3')`
- `console.trace('hi')`
- `util.debuglog('oh')`, write debug msg to stderr based on existence of NODE_DEBUG env variable