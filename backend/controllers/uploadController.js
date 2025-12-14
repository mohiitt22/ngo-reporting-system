const reportQueue = require("../queue/reportQueue");

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert buffer to string
    const csvData = req.file.buffer.toString("utf-8");

    // Add job with CSV data (NOT file path)
    const job = await reportQueue.add("processCSV", {
      csvData
    });

    res.json({ jobId: job.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CSV upload failed" });
  }
};
