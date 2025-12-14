import React, { useEffect, useState } from "react";
import API from "../api";

export default function JobStatus({ jobId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await API.get(`/job-status/${jobId}`);
      setStatus(res.data);

      if (res.data.status === "completed") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  if (!status) return null;

  return (
    <div>
      <h4>Job Status</h4>
      <p>Status: {status.status}</p>
      <p>Processed: {status.processed} / {status.total}</p>
      <p>Failed: {status.failed}</p>
    </div>
  );
}
