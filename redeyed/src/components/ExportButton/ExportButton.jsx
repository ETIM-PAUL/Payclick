

import React from "react";

const ExportButton = ({ onClick, className }) => {
  return (
    <>
      <button onClick={onClick} className={`w-7 h-7 text-center center-svg text-white font-bold bg-blue-500 hover:bg-blue-700 flex ${className}`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
        </path>
      </svg>
      </button>
    </>
  );
};

export default ExportButton;


