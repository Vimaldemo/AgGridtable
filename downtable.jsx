import React, { useState } from "react";
import "./downtable.css";

export default function MasterForm() {
  const emptyDownRow = {
    startRow: "",
    query: "",
    sourceId: "",
    status: "",
  };

  const emptyFormulaRow = { formulaLimit: "", formulaFunc: "" };
  const emptyPrefilledRow = { prefilledLimit: "", prefilledName: "" };

  const emptyBlock = {
    formulaRows: [{ ...emptyFormulaRow, id: Date.now() + Math.random() }],
    prefilledRows: [{ ...emptyPrefilledRow, id: Date.now() + Math.random() }],
    downTable: [emptyDownRow],
  };

  const [blocks, setBlocks] = useState([emptyBlock]);

  // Delete whole block
  // SUBMIT → print top table data
  const handleSubmit = () => {
    console.log("🔹 Down Table Output:", blocks);
  };

  const handleDeleteBlock = (blockIndex) => {
    if (!window.confirm("Delete this block?")) return; // optional confirm
    setBlocks((prev) => prev.filter((_, i) => i !== blockIndex));
  };

  // Delete formula row inside block
  const handleDeleteFormulaRow = (blockIndex, rowId) => {
    setBlocks((prev) =>
      prev.map((b, i) => {
        if (i !== blockIndex) return b;

        const newFormula = b.formulaRows.filter((row) => row.id !== rowId);

        return {
          ...b,
          formulaRows: newFormula, // ❗ no fallback
        };
      })
    );
  };

  // Delete prefilled row inside block
  const handleDeletePrefilledRow = (blockIndex, rowId) => {
    setBlocks((prev) =>
      prev.map((b, i) => {
        if (i !== blockIndex) return b;

        const newPrefilled = b.prefilledRows.filter((row) => row.id !== rowId);

        return {
          ...b,
          prefilledRows: newPrefilled, // ❗ no fallback
        };
      })
    );
  };

  // Add new formula row (limit: 1 per block)
const addFormulaRow = (blockIndex) => {
  setBlocks((prev) =>
    prev.map((block, i) =>
      i === blockIndex
        ? {
            ...block,
            formulaRows: [
              ...block.formulaRows,
              { ...emptyFormulaRow, id: Date.now() + Math.random() },
            ],
          }
        : block
    )
  );
};

  // Add new prefilled row (limit: 1 per block)
  const addPrefilledRow = (blockIndex) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === blockIndex
          ? {
            ...block,
            prefilledRows: [
              ...block.prefilledRows,
              { ...emptyPrefilledRow, id: Date.now() + Math.random() },
            ],
            }
          : block
      )
    );
  };


  const addBlock = () => {
    setBlocks((prev) => [...prev, JSON.parse(JSON.stringify(emptyBlock))]);
  };

  const handleFormulaChange = (blockIndex, rowId, field, value) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === blockIndex
          ? {
              ...block,
              formulaRows: block.formulaRows.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row
              ),
            }
          : block
      )
    );
  };

  const handlePrefilledChange = (blockIndex, rowId, field, value) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === blockIndex
          ? {
              ...block,
              prefilledRows: block.prefilledRows.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row
              ),
            }
          : block
      )
    );
  };

  // Handle down table change
  const handleDownChange = (blockIndex, rowIndex, field, value) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === blockIndex
          ? {
              ...block,
              downTable: block.downTable.map((row, ri) =>
                ri === rowIndex ? { ...row, [field]: value } : row
              ),
            }
          : block
      )
    );
  };
  return (
    <div className="dt-wrapper">
      {blocks.map((block, bIndex) => (
        <div key={bIndex} className="dt-block">
          <div className="dt-delete-block-btn">
            <button onClick={() => handleDeleteBlock(bIndex)}>Delete</button>
          </div>

          {/* DOWN TABLE */}
          <table className="dt-table">
            <thead>
              <tr>
                <th>
                  <h3 className="section-header">Start Row</h3>
                </th>
                <th>
                  <h3 className="section-header">Query</h3>
                </th>
                <th>
                  <h3 className="section-header">Soucre ID</h3>
                </th>
                <th>
                  <h3 className="section-header">Status</h3>
                </th>
              </tr>
            </thead>

            <tbody>
              {block.downTable.map((row, rIndex) => (
                <tr key={rIndex}>
                  <td>
                    <select
                      className="tt-select"
                      value={row.startRow}
                      onChange={(e) =>
                        handleDownChange(
                          bIndex,
                          rIndex,
                          "startRow",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="tt-input"
                      type="text"
                      value={row.query}
                      onChange={(e) =>
                        handleDownChange(
                          bIndex,
                          rIndex,
                          "query",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      className="tt-input"
                      type="number"
                      value={row.sourceId}
                      onChange={(e) =>
                        handleDownChange(
                          bIndex,
                          rIndex,
                          "sourceId",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <select
                      className="tt-select"
                      value={row.status}
                      onChange={(e) =>
                        handleDownChange(
                          bIndex,
                          rIndex,
                          "status",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formula and Prefilled split into two separate boxes */}
          <div className="dt-boxes">
            {/* Formula Box */}
            <div className="dt-box">
              <div className="dt-box-title">
                <h3 className="dt-box-heading">Formula</h3>

                <div className="dt-title-buttons">
                  <button
                    onClick={() => addFormulaRow(bIndex)}
                    className="dt-add-button small"
                    disabled={
                      block.formulaRows && block.formulaRows.length >= 1
                    }
                  >
                    + Add
                  </button>

                  <button
                    className="dt-row-delete"
                    onClick={() =>
                      setBlocks((prev) =>
                        prev.map((b, i) =>
                          i === bIndex ? { ...b, formulaRows: [] } : b
                        )
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>

              {block.formulaRows.map((row, rIndex) => (
                <div key={row.id} className="dt-row">
                  <select
                    value={row.formulaLimit}
                    onChange={(e) =>
                      handleFormulaChange(
                        bIndex,
                        row.id,
                        "formulaLimit",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Limit (A–Z)</option>
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>

                  <select
                    value={row.formulaFunc}
                    onChange={(e) =>
                      handleFormulaChange(
                        bIndex,
                        row.id,
                        "formulaFunc",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Function</option>
                    <option value="round">ROUND</option>
                    <option value="sum">SUM</option>
                  </select>

                </div>
              ))}
            </div>

            {/* Prefilled Box */}
            <div className="dt-box">
              <div className="dt-box-title">
                <h3 className="dt-box-heading">Prefilled Data</h3>
                <div className="dt-title-buttons">
                  <button
                    onClick={() => addPrefilledRow(bIndex)}
                    className="dt-add-button small"
                    disabled={
                      block.prefilledRows && block.prefilledRows.length >= 1
                    }
                  >
                    + Add
                  </button>
                  <button
                    className="dt-row-delete"
                    onClick={() =>
                      setBlocks((prev) =>
                        prev.map((b, i) =>
                          i === bIndex ? { ...b, prefilledRows: [] } : b
                        )
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>

              {block.prefilledRows.map((row, rIndex) => (
                <div key={row.id} className="dt-row">
                  <select
                    value={row.prefilledLimit}
                    onChange={(e) =>
                      handlePrefilledChange(
                        bIndex,
                        row.id,
                        "prefilledLimit",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Limit (A–Z)</option>
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Enter Data"
                    value={row.prefilledName}
                    onChange={(e) =>
                      handlePrefilledChange(
                        bIndex,
                        row.id,
                        "prefilledName",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="dt-add-block-container">
        {/* Add full duplicate block */}
        <button onClick={addBlock} className="dt-add-block-button">
          + Add Block
        </button>
        <button onClick={handleSubmit} className="dt-submit-button">
          Submit
        </button>
      </div>
    </div>
  );
}
