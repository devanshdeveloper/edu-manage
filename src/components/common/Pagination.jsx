import isThis from "@devanshdeveloper/is-this";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalEntries,
}) => {
  const showing =
    totalEntries === 0 || !isThis.isNumber(totalEntries)
      ? 0
      : (currentPage - 1) * pageSize + 1;
  const showingOf = Math.min(currentPage * pageSize, totalEntries);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-[#025AE0] border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-end py-2 font-inter w-full mt-4">
      <div className="flex items-center space-x-2">
        <div className="text-sm text-[#3D3E3F]">
          Showing {!isThis.isNumber(currentPage) ? 0 : showing} to{" "}
          {isNaN(showingOf) ? 0 : showingOf} of{" "}
          {isNaN(totalEntries) ? 0 : totalEntries} entries
        </div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded font-medium transition-200 duration-200 ${
            currentPage === 1
              ? " text-[#717273] cursor-not-allowed"
              : " hover:text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <div className="flex">{renderPageNumbers()}</div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : " text-[#025AE0]"
          }`}
        >
          Next
        </button>
        <select
          className="select-no-arrow px-2 py-1 border border-gray-300  text-[#3D3E3F] bg-white rounded-lg"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
