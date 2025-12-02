const bcrypt = require('bcryptjs');

// Ganti dengan password yang diinginkan
const password = 'admin123';

const hash = bcrypt.hashSync(password, 10);
console.log('\n=================================');
console.log('Password:', password);
console.log('Hashed:', hash);
console.log('=================================\n');
console.log('Copy hash di atas untuk digunakan di SQL INSERT statement');
