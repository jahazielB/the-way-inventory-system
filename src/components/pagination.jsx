import { useState } from "react";

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white w-fit rounded-2xl">
      {/* Previous Button */}
      <button
        className="flex items-center px-2 py-1 text-black hover:text-gray-600 disabled:opacity-40"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.8334 17.9998H12.1667M12.1667 17.9998L18 23.8332M12.1667 17.9998L18 12.1665" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded-md ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "text-black border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="flex items-center px-2 py-1 text-black hover:text-gray-600 disabled:opacity-40"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.1667 17.9998H23.8334M23.8334 17.9998L18 12.1665M23.8334 17.9998L18 23.8332" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button>
    </div>
  );
};

