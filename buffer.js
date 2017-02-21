Buffer.alloc(8); // allocate 8 bytes of memory and initialize them to zeros
Buffer.allocUnsafe(8); // allocate 8 bytes of memory and no initialization
Buffer.allocUnsafe(8).fill(); // similar to Buffer.alloc(8)

Buffer.allocUnsafe(500).toString();

const string = 'touch好';
const buffer = Buffer.from('touch好'); // no character encoding, the special character is represented in internal utf8, and the length will be the actual number of bytes used
console.log(string, string.length); // string is counting characters based on the default utf8 encoding
console.log(buffer, buffer.length);