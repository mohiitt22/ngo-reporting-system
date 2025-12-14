const { v4: uuidv4 } = require("uuid");
const db = require("../db/database");
const reportQueue = require("../queue/reportQueue");

exports.uploadCSV = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "CSV file required" });
  }

  const jobId = uuidv4();

  db.prepare(`
    INSERT INTO jobs (job_id, total, processed, failed, status)
    VALUES (?, 0, 0, 0, 'queued')
  `).run(jobId);

  await reportQueue.add("processCSV", {
    jobId,
    filePath: file.path,
  });

  res.json({ job_id: jobId });
};
