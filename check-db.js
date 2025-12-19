// Script untuk melihat isi database SQLite
const Database = require('better-sqlite3');
const db = new Database('./sqlite.db');

console.log('\n📊 Database Tables:');
console.log('==================');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
tables.forEach(t => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM "${t.name}"`).get();
    console.log(`- ${t.name}: ${count.count} rows`);
});

console.log('\n✅ Database is ready!');
db.close();
