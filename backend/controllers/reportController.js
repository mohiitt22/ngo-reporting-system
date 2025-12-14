const db = require("../db/database");

exports.submitReport = (req, res) => {
  try {
    const { ngo_id, month, people_helped, events_conducted, funds_utilized } =
      req.body;

    if (!ngo_id || !month) {
      return res.status(400).json({ message: "NGO ID and Month required" });
    }

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO reports
      (ngo_id, month, people_helped, events_conducted, funds_utilized)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      ngo_id,
      month,
      people_helped || 0,
      events_conducted || 0,
      funds_utilized || 0
    );

    res.json({ message: "Report submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
