const db = require("../db/database");

exports.getDashboard = (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const data = db
      .prepare(
        `
      SELECT 
        COUNT(DISTINCT ngo_id) as total_ngos,
        SUM(people_helped) as total_people_helped,
        SUM(events_conducted) as total_events,
        SUM(funds_utilized) as total_funds
      FROM reports
      WHERE month = ?
    `
      )
      .get(month);

    res.json({
      month,
      total_ngos: data.total_ngos || 0,
      total_people_helped: data.total_people_helped || 0,
      total_events: data.total_events || 0,
      total_funds: data.total_funds || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
