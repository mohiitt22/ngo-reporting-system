const fs = require("fs");
const csv = require("fast-csv");

exports.parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("error", reject)
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows));
  });
};
