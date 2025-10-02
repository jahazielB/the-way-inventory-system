// ExportPreview.jsx
import * as XLSX from "xlsx";

export const ExportPreview = ({ data, filename = "Data.xlsx" }) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  if (!data || data.length === 0) return <p>No data to preview</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="flex flex-col">
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-3 py-1 rounded mb-2 self-start active:bg-amber-300 hover:bg-green-700"
      >
        Download Excel
      </button>

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
