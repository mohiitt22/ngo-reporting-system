const db = require("../db/database");

exports.getJobStatus = (req, res) => {
  const { job_id } = req.params;

  const job = db
    .prepare(`SELECT * FROM jobs WHERE job_id = ?`)
    .get(job_id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};
