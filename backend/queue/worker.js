const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const csv = require("csv-parser");
const { Readable } = require("stream");
const db = require("../db/database");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

new Worker(
  "reportQueue",
  async (job) => {
    const { csvData } = job.data;

    // 1️⃣ Parse CSV first to know total rows
    const rows = [];

    await new Promise((resolve, reject) => {
      Readable.from(csvData)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    const total = rows.length;
    let processed = 0;
    let failed = 0;

    // 2️⃣ Process rows one by one and update progress
    for (const row of rows) {
      try {
        const {
          ngo_id,
          month,
          people_helped,
          events_conducted,
          funds_utilized
        } = row;

        db.prepare(`
          INSERT OR REPLACE INTO reports
          (ngo_id, month, people_helped, events_conducted, funds_utilized)
          VALUES (?, ?, ?, ?, ?)
        `).run(
          ngo_id,
          month,
          Number(people_helped) || 0,
          Number(events_conducted) || 0,
          Number(funds_utilized) || 0
        );

        processed++;
      } catch (err) {
        failed++;
      }

      // 🔥 THIS IS THE KEY: UPDATE PROGRESS
      await job.updateProgress({
        processed,
        total,
        failed
      });
    }

    // 3️⃣ Final result
    return {
      processed,
      total,
      failed
    };
  },
  { connection }
);

console.log("Worker started...");
