import React, { useState } from "react";
import API from "../api";
import JobStatus from "../components/JobStatus";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/reports/upload", formData);
    setJobId(res.data.job_id);
  };

  return (
    <div>
      <h2>Bulk CSV Upload</h2>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>

      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
