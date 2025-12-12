const fs = require('fs');
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 10);
fs.writeFileSync('hash_output.txt', hash);
console.log('Hash written to hash_output.txt');
