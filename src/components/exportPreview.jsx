// ExportPreview.jsx
import * as XLSX from "xlsx";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

export const ExportPreview = ({ data, filename = "Data.xlsx" }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true); // start loading

    try {
      // Simulate async operation in case data is large
      await new Promise((resolve) => setTimeout(resolve, 100)); 

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  if (!data || data.length === 0) return <p>No data to preview</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="flex flex-col">
      <span>{filename}</span>
      <Button
        onClick={handleDownload}
        variant="contained"
        color="success"
        disabled={loading} // disable button while loading
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} // show spinner
        className="mb-2 self-start"
      >
        {loading ? "Downloading..." : "Download Excel"}
      </Button>

      <div className="overflow-auto max-h-[500px] border rounded bg-white">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {headers.map((key) => (
                <th key={key} className="border px-2 py-1 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {headers.map((key) => (
                  <td key={key} className="border px-2 py-1">
                    {key === "reorder_notification"
                        ? row[key] ? "REORDER" : "IN STOCK"
                        : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
