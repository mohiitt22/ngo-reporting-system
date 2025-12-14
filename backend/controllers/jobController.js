// const db = require("../db/database");

// exports.getJobStatus = (req, res) => {
//   const { job_id } = req.params;

//   const job = db
//     .prepare(`SELECT * FROM jobs WHERE job_id = ?`)
//     .get(job_id);

//   if (!job) {
//     return res.status(404).json({ message: "Job not found" });
//   }

//   res.json(job);
// };
const reportQueue = require("../queue/reportQueue");

exports.getJobStatus = async (req, res) => {
  try {
    const jobId = req.params.job_id;

    const job = await reportQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const state = await job.getState();

    res.json({
      status: state,
      progress: job.progress || {
        processed: 0,
        total: 0,
        failed: 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get job status" });
  }
};
