#!/usr/bin/env node
/**
 * Database Backup Script
 *
 * Exports ALL database data to JSON files
 * Run this BEFORE making schema changes to avoid data loss
 *
 * Usage: npm run db:backup
 */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Create backups directory if it doesn't exist
const backupsDir = path.join(__dirname, "..", "backups");
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

// Generate timestamp for backup folder
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, -5);
const backupFolder = path.join(backupsDir, `backup-${timestamp}`);
fs.mkdirSync(backupFolder, { recursive: true });

async function backupDatabase() {
  console.log("\n🔄 Creating full database backup...\n");

  try {
    // Backup all tables
    const tables = [
      { name: "categories", model: prisma.category },
      { name: "certificates", model: prisma.certificate },
      { name: "policy", model: prisma.policy },
      { name: "machineryCategories", model: prisma.machineryCategory },
      { name: "machineryModels", model: prisma.machineryModel },
      { name: "clients", model: prisma.client },
      { name: "projects", model: prisma.project },
      { name: "projectImages", model: prisma.projectImage },
      { name: "machineryImages", model: prisma.machineryImage },
    ];

    let totalRecords = 0;

    for (const table of tables) {
      try {
        const data = await table.model.findMany();
        const filePath = path.join(backupFolder, `${table.name}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ ${table.name}: ${data.length} records`);
        totalRecords += data.length;
      } catch (error) {
        // Table might not exist yet - skip it
        console.log(`⚠️  ${table.name}: Table not found (skipped)`);
      }
    }

    console.log("\n═══════════════════════════════════════════");
    console.log(`✅ Backup complete! Total: ${totalRecords} records`);
    console.log("═══════════════════════════════════════════\n");
    console.log(`📁 Location: ${path.relative(process.cwd(), backupFolder)}\n`);
  } catch (error) {
    console.error("❌ Backup failed:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backupDatabase();
