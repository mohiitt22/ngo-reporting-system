const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const reportRoutes = require("./routes/reportRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/report", reportRoutes);
app.use("/reports/upload", uploadRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/job-status", jobRoutes);

// ================================
// SERVE FRONTEND (React build)
// ================================
app.use(
  express.static(path.join(__dirname, "../frontend/dist"))
);

// React routing fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
