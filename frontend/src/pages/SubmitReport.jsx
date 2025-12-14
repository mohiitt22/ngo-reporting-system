import React, { useState } from "react";
import API from "../api";

export default function SubmitReport() {
  const [form, setForm] = useState({
    ngo_id: "",
    month: "",
    people_helped: "",
    events_conducted: "",
    funds_utilized: "",
  });

  const submit = async () => {
    await API.post("/report", form);
    alert("Report submitted");
  };

  return (
    <div>
      <h2>Submit Monthly Report</h2>

      <input placeholder="NGO ID" onChange={e => setForm({ ...form, ngo_id: e.target.value })} /><br />
      <input placeholder="Month (YYYY-MM)" onChange={e => setForm({ ...form, month: e.target.value })} /><br />
      <input placeholder="People Helped" onChange={e => setForm({ ...form, people_helped: e.target.value })} /><br />
      <input placeholder="Events Conducted" onChange={e => setForm({ ...form, events_conducted: e.target.value })} /><br />
      <input placeholder="Funds Utilized" onChange={e => setForm({ ...form, funds_utilized: e.target.value })} /><br />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
