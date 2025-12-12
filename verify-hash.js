const bcrypt = require('bcryptjs');

const password = 'admin123';
const hash = '$2a$10$rKZxJxH5qZQJ5YqZQJ5YqOqZQJ5YqZQJ5YqZQJ5YqZQJ5YqZQJ5Yq';

console.log('Testing hash verification...');
bcrypt.compare(password, hash).then(valid => {
    console.log(`Password '${password}' matches hash: ${valid}`);
    if (!valid) {
        console.log('Generating new hash...');
        const newHash = bcrypt.hashSync(password, 10);
        console.log('New hash:', newHash);
    }
});
