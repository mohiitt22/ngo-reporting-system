const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const fs = require("fs");
const db = require("../db/database");
const { parseCSV } = require("../utils/csvParser");
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});


const worker = new Worker(
  "reportQueue",
  async (job) => {
    const { jobId, filePath } = job.data;

    try {
      const rows = await parseCSV(filePath);

      db.prepare(
        `
        UPDATE jobs SET total = ?, status = 'processing'
        WHERE job_id = ?
      `
      ).run(rows.length, jobId);

      let processed = 0;
      let failed = 0;

      for (const row of rows) {
        try {
          const {
            ngo_id,
            month,
            people_helped,
            events_conducted,
            funds_utilized,
          } = row;

          if (!ngo_id || !month) {
            throw new Error("Invalid row");
          }

          db.prepare(
            `
            INSERT OR REPLACE INTO reports
            (ngo_id, month, people_helped, events_conducted, funds_utilized)
            VALUES (?, ?, ?, ?, ?)
          `
          ).run(
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

        db.prepare(
          `
          UPDATE jobs
          SET processed = ?, failed = ?
          WHERE job_id = ?
        `
        ).run(processed, failed, jobId);
      }

      db.prepare(
        `
        UPDATE jobs SET status = 'completed'
        WHERE job_id = ?
      `
      ).run(jobId);

      fs.unlinkSync(filePath);
    } catch (err) {
      db.prepare(
        `
        UPDATE jobs SET status = 'failed'
        WHERE job_id = ?
      `
      ).run(jobId);
    }
  },
  { connection }
);

console.log("Worker started...");
