import React, { useState } from "react";

export function SudokuUpload() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/extract", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // 🔥 Log message from backend
      console.log(data.message);
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="browsercontainer">
        <h4 className="uploadtitle">Upload File</h4>
        <input type="file" onChange={handleUpload} />
      </div>

      {loading && <p>Waiting for backend response…</p>}
    </div>
  );
}
