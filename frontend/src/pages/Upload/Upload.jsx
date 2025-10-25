import React, { useState } from "react";
import { uploadAndDistribute } from "../../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await uploadAndDistribute(fd);
      alert(res.data.message || "Distributed");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload CSV / XLSX</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload & Distribute</button>
      </form>
      <p>CSV must include headers: FirstName, Phone, Notes (case-insensitive)</p>
    </div>
  );
}
