import React, { useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await API.get(`/dashboard?month=${month}`);
    setData(res.data);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input placeholder="YYYY-MM" onChange={e => setMonth(e.target.value)} />
      <button onClick={fetchData}>Load</button>

      {data && (
        <div>
          <p>Total NGOs Reporting: {data.total_ngos}</p>
          <p>Total People Helped: {data.total_people_helped}</p>
          <p>Total Events Conducted: {data.total_events}</p>
          <p>Total Funds Utilized: {data.total_funds}</p>
        </div>
      )}
    </div>
  );
}
