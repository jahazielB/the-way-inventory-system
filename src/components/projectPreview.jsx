import  { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProjectPreview = () => {
  const navigate = useNavigate()
  // Temporary static approvals data
  const [approvals] = useState([
    {
      status: "Pending",
      color: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
      item_name: "DB0102 DOUG'S Green 8mm",
      qty: "5000 PCS",
      approved_by: "John Doe",
      stage: "FOR APPROVAL",
    },
    {
      status: "Approved",
      color: "bg-green-100 text-green-700",
      dot: "bg-green-500",
      item_name: "BD-11G Glossy Brown",
      qty: "3000 PCS",
      approved_by: "Jane Smith",
      stage: "APPROVED",
    },
    {
      status: "Pending",
      color: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
      item_name: "BD-17P Orange Pearl",
      qty: "1200 PCS",
      approved_by: "Michael Lee",
      stage: "FOR APPROVAL",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 font-jakarta h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] font-semibold">Latest Approvals</h2>
        <span
          onClick={()=>navigate("/notifications")}
          className="text-purple-600 text-[10px] text-sm hover:underline cursor-pointer"
        >
          See All Notifications →
        </span>
      </div>

      {/* Table */}
      {approvals.length === 0 ? (
        <div className="text-gray-400 text-center py-10 text-sm">
          No approval requests
        </div>
      ):(<div className="divide-y divide-gray-200">
        {approvals.map((a, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            {/* Status */}
            <div className="flex items-center gap-2 w-1/4">
              <span
                className={`flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-medium ${a.color}`}
              >
                <span className={`w-2 h-2 rounded-full ${a.dot}`}></span>
                {a.status}
              </span>
            </div>

            {/* Item Name */}
            <div className="w-1/4 font-semibold text-[12px] md:text-[15px]">
              {a.item_name}
            </div>

            {/* Quantity */}
            <div className="w-1/4 font-semibold text-[12px] md:text-[15px]">
              {a.qty}
            </div>

            {/* Approved By / Stage */}
            <div className="w-1/4 text-gray-500 text-[10px] md:text-[13px]">
              {a.approved_by} - {a.stage}
            </div>

            {/* Menu dots */}
            <div className="w-6 text-gray-400 cursor-pointer">⋯</div>
          </div>
        ))}
      </div>)}
    </div>
  );
};
