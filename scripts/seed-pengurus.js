/**
 * Simple Node.js script to parse pengurus.md and generate SQL
 * Run with: node scripts/seed-pengurus.js
 */

const fs = require('fs');
const path = require('path');

function parsePengurusFile(content) {
    // Normalize line endings and split
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(line => line.trim());
    const entries = [];
    let orderIndex = 0;

    for (const line of lines) {
        // Parse: Nama : XXX Jabatan : YYY Bidang : ZZZ Program studi/angkatan : WWW
        const nameMatch = line.match(/Nama\s*:\s*(.+?)\s+Jabatan\s*:/i);
        const jabatanMatch = line.match(/Jabatan\s*:\s*(.+?)\s+Bidang\s*:/i);
        const bidangMatch = line.match(/Bidang\s*:\s*(.+?)\s+Program studi\/angkatan\s*:/i);
        const prodiMatch = line.match(/Program studi\/angkatan\s*:\s*(.+?)\s*$/i);

        if (nameMatch && jabatanMatch && bidangMatch && prodiMatch) {
            const name = nameMatch[1].trim();
            const position = jabatanMatch[1].trim();
            const division = bidangMatch[1].trim();
            const programStudi = prodiMatch[1].trim();

            orderIndex++;

            entries.push({
                id: `cab_seed_${orderIndex}`,
                name,
                position,
                division,
                programStudi,
                orderIndex
            });
        }
    }

    return entries;
}

function generateInsertSQL(entries) {
    const now = new Date().toISOString();
    const values = entries.map(e => {
        const escapedName = e.name.replace(/'/g, "''");
        const escapedPosition = e.position.replace(/'/g, "''");
        const escapedDivision = e.division.replace(/'/g, "''");
        const escapedProdi = e.programStudi.replace(/'/g, "''");

        return `('${e.id}', '${escapedName}', '${escapedPosition}', '${escapedDivision}', '${escapedProdi}', NULL, NULL, NULL, NULL, ${e.orderIndex}, '${now}', '${now}')`;
    });

    return `-- Seed data for cabinet_members table
-- Generated from pengurus.md on ${new Date().toLocaleString()}
-- Run with: npx wrangler d1 execute tutorial-pai-db --file=scripts/seed-pengurus.sql

-- Clear existing data first (CAUTION: this deletes all existing members)
DELETE FROM cabinet_members;

-- Insert seed data (${entries.length} entries)
INSERT INTO cabinet_members (id, name, position, division, program_studi, photo_url, email, phone, bio, order_index, created_at, updated_at) VALUES
${values.join(',\n')};
`;
}

// Main execution
const pengurusPath = path.join(__dirname, '..', 'pengurus.md');
const outputSqlPath = path.join(__dirname, 'seed-pengurus.sql');
const outputJsonPath = path.join(__dirname, 'seed-data.json');

try {
    const content = fs.readFileSync(pengurusPath, 'utf-8');
    const entries = parsePengurusFile(content);

    // Save SQL
    const sql = generateInsertSQL(entries);
    fs.writeFileSync(outputSqlPath, sql);
    console.log(`✅ Generated SQL to ${outputSqlPath}`);

    // Save JSON
    fs.writeFileSync(outputJsonPath, JSON.stringify(entries, null, 2));
    console.log(`✅ Generated JSON to ${outputJsonPath}`);

    console.log(`\n📊 Total entries: ${entries.length}`);

    // Print summary by division
    const byDivision = {};
    entries.forEach(e => {
        byDivision[e.division] = (byDivision[e.division] || 0) + 1;
    });

    console.log('\n📋 Summary by Division:');
    Object.entries(byDivision)
        .sort((a, b) => b[1] - a[1])
        .forEach(([div, count]) => {
            console.log(`   ${div}: ${count}`);
        });

    console.log('\n🚀 To import to database, run:');
    console.log('   npx wrangler d1 execute tutorial-pai-db --file=scripts/seed-pengurus.sql');

} catch (error) {
    console.error('❌ Error:', error.message);
}
