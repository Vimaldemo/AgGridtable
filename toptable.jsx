import React, { useState } from "react";
import "./toptable.css";

export default function TopTable() {
  const [formData, setFormData] = useState({
    reportName: "",
    processName: "",
    folderPath: "",
    database: "",
  });

  const processOptions = ["Process A", "Process B", "Process C"];
  const databaseOptions = ["User Details", "Students Details"];
  // SUBMIT → print top table data
  const handleSubmit = () => {
    console.log("🔹 Top Table Output:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="tt-wrapper">
      <table className="tt-table">
        <thead>
          <tr>
            <th>
              <h3 className="section-header">Report Name</h3>
            </th>
            <th>
              <h3 className="section-header">Process Name</h3>
            </th>
            <th>
              <h3 className="section-header">Folder Path</h3>
            </th>
            <th>
              <h3 className="section-header">Database</h3>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {/* Report Name entry field */}
            <td className="tt-cell-line">
              <input
                className="tt-input"
                type="text"
                name="reportName"
                value={formData.reportName}
                onChange={handleChange}
                placeholder="Enter Report Name"
              />
            </td>

            {/* Process Name dropdown */}
            <td className="tt-cell-line">
              <select
                className="tt-select"
                name="processName"
                value={formData.processName}
                onChange={handleChange}
              >
                <option value="">Select Process</option>
                {processOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </td>

            {/* Folder Path entry field */}
            <td className="tt-cell-line">
              <input
                className="tt-input"
                type="text"
                name="folderPath"
                value={formData.folderPath}
                onChange={handleChange}
                placeholder="Enter Folder Path"
              />
            </td>

            {/* Database dropdown */}
            <td className="tt-cell-line">
              <select
                className="tt-select"
                name="database"
                value={formData.database}
                onChange={handleChange}
              >
                <option value="">Select DB</option>
                {databaseOptions.map((db) => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="tt-add-block-container">
        <button
          onClick={handleSubmit}
          className="tt-submit-button"
          style={{ marginTop: "15px", padding: "8px 14px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
