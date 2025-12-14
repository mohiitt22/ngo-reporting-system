const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const csv = require("csv-parser");
const { Readable } = require("stream");
const db = require("../db/database");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

const worker = new Worker(
  "reportQueue",
  async (job) => {
    const { csvData } = job.data;

    let processed = 0;
    let failed = 0;

    const stream = Readable.from(csvData);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => {
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
        })
        .on("end", () => {
          resolve({ processed, failed });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  },
  { connection }
);

console.log("Worker started...");
