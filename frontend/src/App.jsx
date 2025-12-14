import React from "react";
import SubmitReport from "./pages/SubmitReport";
import BulkUpload from "./pages/BulkUpload";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>NGO Reporting System</h1>

      <hr />
      <SubmitReport />

      <hr />
      <BulkUpload />

      <hr />
      <Dashboard />
    </div>
  );
}
