
import React from "react";

const MkdSimpleTable = ({ data = [], className = "", title }) => {
  return (
    <div className={`w-full p-5 ${className}`}>
      <div className="flex flex-col gap-[2.5rem]">
        <div className="relative min-h-fit w-full ">
          <div
            className={`absolute left-0 top-[-15px] m-auto flex gap-5 bg-white text-black`}
          >
            {/* <TableCellsIcon className="h-6 w-6" /> */}
            {title ? title : "Data Table"}
          </div>
          <div className="relative mt-5 min-h-fit w-full max-w-full overflow-auto">
            {data.length ? (
              <table className="min-h-[6.25rem] w-full border border-gray-600">
                <thead className="min-h-[50px]">
                  <tr className="w-fit ">
                    {data.length
                      ? Object.keys(data[0]).map((item, index) => (
                          <th
                            key={`${item}_${index}`}
                            scope="col"
                            className="border border-gray-600 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            {item}
                          </th>
                        ))
                      : null}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="w-fit ">
                      {Object.values(row).map((value, valueKey) => (
                        <td
                          key={valueKey}
                          // scope="col"
                          className="border border-gray-600 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MkdSimpleTable;
