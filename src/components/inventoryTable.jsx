
export const InventoryTable = () => {
  const data = [
    { item: "Yellow", units: 10, status: "In Stock" },
    { item: "Black", units: 12, status: "In Stock" },
    { item: "Green", units: 9, status: "Low In Stock" },
    { item: "Talong", units: 5, status: "Low in Stock" },
    { item: "Candy Red", units: 0, status: "Out of Stock" },
    { item: "Item 6", units: "Text", status: "Text" },
    { item: "Item 7", units: "Text", status: "Text" },
    { item: "Item 8", units: "Text", status: "Text" },
    { item: "Item 9", units: "Text", status: "Text" },
    { item: "Item 10", units: "Text", status: "Text" },
    { item: "Item 11", units: "Text", status: "Text" },
    { item: "Item 12", units: "Text", status: "Text" },
    { item: "Item 13", units: "Text", status: "Text" },
    { item: "Item 14", units: "Text", status: "Text" },
    { item: "Item 15", units: "Text", status: "Text" },
  ];

  return (
    <div className="">
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full w-[900px] divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="inventory-column">
                ITEM
              </th>
              <th className="inventory-column">
                Units
              </th>
              <th className="inventory-column">
                Status
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                <td className="inventory-row">
                  {row.item}
                </td>
                <td className="inventory-row">
                  {row.units}
                </td>
                <td className="inventory-row">
                  {row.status}
                </td>
                <td className="px-2 py-0 whitespace-nowrap">
                  <div className="flex items-center justify-center h-full">
                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


