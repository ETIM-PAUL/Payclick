
import React from "react";
const PaginationBar = ({ currentPage, pageCount, pageSize, canPreviousPage, canNextPage, updatePageSize, previousPage, nextPage }) => {
  return (
    <>
      <div className="flex justify-between ">
        <div className="mt-2">
          <span>
            Page{" "}
            <strong>
              {+currentPage} of {pageCount}
            </strong>{" "}
          </span>
          <select
            className="mt-2"
            value={pageSize}
            onChange={(e) => {
              updatePageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {/*  */}
        <div>
          <button onClick={previousPage} disabled={!canPreviousPage} className={`font-bold h-10 w-10 `}>
            &#x02190;
          </button>{" "}
          <button onClick={nextPage} disabled={!canNextPage} className={`font-bold h-10 w-10 `}>
            &#x02192;
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default PaginationBar;


