import React from "react";

const projects = [
  { status: "Completed", color: "bg-green-100 text-green-700", dot: "bg-green-500", name: "TORPEDO", qty: "5000 PCS", stage: "FOR DELIVERY" },
  { status: "Completed", color: "bg-green-100 text-green-700", dot: "bg-green-500", name: "DOUG", qty: "5000 PCS", stage: "FOR DELIVERY" },
  { status: "Pending", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500", name: "WARRIOR", qty: "5000 PCS", stage: "FOR PACKAGING" }
];

export const ProjectPreview=()=> {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 font-jakarta h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] font-semibold">Projects</h2>
        <a href="#" className="text-purple-600 text-[10px] text-sm hover:underline">
          See All Projects →
        </a>
      </div>

      {/* Table */}
      <div className="divide-y divide-gray-200">
        {projects.map((p, i) => (
          <div
           key={i} className="flex items-center justify-between py-3">
            {/* Status */}
            <div className="flex items-center gap-2 w-1/3">
              <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-medium ${p.color}`}>
                <span className={`w-2 h-2 rounded-full ${p.dot}`}></span>
                {p.status}
              </span>
              
            </div>

            {/* Project Name */}
            <div className="w-1/3 font-semibold text-[12px] md:text-[15px]">{p.name}</div>

            {/* Quantity */}
            <div className="w-1/3 font-semibold text-[12px] md:text-[15px]">{p.qty}</div>

            {/* Stage */}
            <div className="w-1/3 text-gray-500 text-[10px] md:text-[13px]">{p.stage}</div>

            {/* Menu dots */}
            <div className="w-6 text-gray-400 cursor-pointer ">⋯</div>
          </div>
        ))}
      </div>
    </div>
  );
}
