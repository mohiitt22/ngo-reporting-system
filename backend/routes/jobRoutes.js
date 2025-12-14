const express = require("express");
const router = express.Router();
const { getJobStatus } = require("../controllers/jobController");

router.get("/:job_id", getJobStatus);

module.exports = router;
