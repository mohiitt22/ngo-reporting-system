const express = require("express");
const multer = require("multer");
const { uploadCSV } = require("../controllers/uploadController");

const router = express.Router();

// Store file in memory, NOT on disk
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadCSV);

module.exports = router;
