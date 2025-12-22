/**
 * Script to parse pengurus.md and generate seed data for database
 * 
 * Usage: 
 * 1. Run: npx ts-node scripts/seed-pengurus.ts
 * 2. Copy the generated JSON to import via API or directly
 * 
 * OR use the generated seed-data.json with:
 * npx wrangler d1 execute tutorial-pai-db --file=scripts/seed-pengurus.sql
 */

import * as fs from 'fs';
import * as path from 'path';

interface PengurusEntry {
    id: string;
    name: string;
    position: string;
    division: string;
    programStudi: string;
    photoUrl: string | null;
    orderIndex: number;
}

function parsePengurusFile(content: string): PengurusEntry[] {
    const lines = content.split('\n').filter(line => line.trim());
    const entries: PengurusEntry[] = [];
    let orderIndex = 0;

    for (const line of lines) {
        // Parse: Nama : XXX Jabatan : YYY Bidang : ZZZ Program studi/angkatan : WWW
        const nameMatch = line.match(/Nama\s*:\s*(.+?)\s*Jabatan\s*:/i);
        const jabatanMatch = line.match(/Jabatan\s*:\s*(.+?)\s*Bidang\s*:/i);
        const bidangMatch = line.match(/Bidang\s*:\s*(.+?)\s*Program studi\/angkatan\s*:/i);
        const prodiMatch = line.match(/Program studi\/angkatan\s*:\s*(.+?)$/i);

        if (nameMatch && jabatanMatch && bidangMatch && prodiMatch) {
            const name = nameMatch[1].trim();
            const position = jabatanMatch[1].trim();
            const division = bidangMatch[1].trim();
            const programStudi = prodiMatch[1].trim();

            // Generate unique ID
            const id = `cab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            orderIndex++;

            entries.push({
                id,
                name,
                position,
                division,
                programStudi,
                photoUrl: null,
                orderIndex
            });
        }
    }

    return entries;
}

function generateInsertSQL(entries: PengurusEntry[]): string {
    const now = new Date().toISOString();
    const values = entries.map(e => {
        const escapedName = e.name.replace(/'/g, "''");
        const escapedPosition = e.position.replace(/'/g, "''");
        const escapedDivision = e.division.replace(/'/g, "''");
        const escapedProdi = e.programStudi.replace(/'/g, "''");

        return `('${e.id}', '${escapedName}', '${escapedPosition}', '${escapedDivision}', '${escapedProdi}', NULL, NULL, NULL, NULL, ${e.orderIndex}, '${now}', '${now}')`;
    });

    return `-- Seed data for cabinet_members table
-- Generated from pengurus.md
-- Run with: npx wrangler d1 execute tutorial-pai-db --file=scripts/seed-pengurus.sql

-- First, clear existing data (optional - comment out if you want to keep existing)
-- DELETE FROM cabinet_members;

-- Insert new data
INSERT INTO cabinet_members (id, name, position, division, program_studi, photo_url, email, phone, bio, order_index, created_at, updated_at) VALUES
${values.join(',\n')};
`;
}

// Main execution
const pengurusPath = path.join(__dirname, '..', 'pengurus.md');
const outputJsonPath = path.join(__dirname, 'seed-data.json');
const outputSqlPath = path.join(__dirname, 'seed-pengurus.sql');

try {
    const content = fs.readFileSync(pengurusPath, 'utf-8');
    const entries = parsePengurusFile(content);

    // Save JSON
    fs.writeFileSync(outputJsonPath, JSON.stringify(entries, null, 2));
    console.log(`✅ Generated ${entries.length} entries to ${outputJsonPath}`);

    // Save SQL
    const sql = generateInsertSQL(entries);
    fs.writeFileSync(outputSqlPath, sql);
    console.log(`✅ Generated SQL to ${outputSqlPath}`);

    // Print summary by division
    const byDivision: Record<string, number> = {};
    entries.forEach(e => {
        byDivision[e.division] = (byDivision[e.division] || 0) + 1;
    });

    console.log('\n📊 Summary by Division:');
    Object.entries(byDivision)
        .sort((a, b) => b[1] - a[1])
        .forEach(([div, count]) => {
            console.log(`   ${div}: ${count}`);
        });

} catch (error) {
    console.error('❌ Error:', error);
}
