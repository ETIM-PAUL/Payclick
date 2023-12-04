
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { Spinner } from "Assets/svgs";

const acceptType = (fileType) => {
  switch (fileType) {
    case "excel":
      return ".xlsx,.xls";
    case "csv":
      return ".csv";
    default:
      return ".xlsx,.xls";
  }
};

const MkdFileTable = ({
  title = "File Table",
  className = "",
  fileType = "excel",
}) => {
  const inputRef = useRef(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleExcelFile = (e) => {
    try {
      setData(() => []);
      setDataLoading(true);
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
        setDataLoading(false);
        inputRef.current.value = "";
      };
    } catch (error) {
      setDataLoading(false);
      inputRef.current.value = "";
    }
  };

  const handleCsvFile = (e) => {
    try {
      setData(() => []);
      setDataLoading(true);
      const file = e.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
          inputRef.current.value = "";
          setDataLoading(false);
        },
      });
    } catch (error) {
      inputRef.current.value = "";
      setDataLoading(false);
    }
  };

  const handleFileInput = (e) => {
    switch (fileType) {
      case "excel":
        return handleExcelFile(e);
      case "csv":
        return handleCsvFile(e);
      default:
        return handleExcelFile(e);
    }
  };

  return (
    <div className={`w-full p-5 ${className}`}>
      <div className="flex flex-col gap-[2.5rem]">
        <div className="flex flex-col justify-start py-4">
          <label htmlFor="input" className="mb-2 font-bold">
            Select <span className="uppercase">{fileType}</span> File.
          </label>
          <input
            disabled={dataLoading}
            className="w-[20%] cursor-pointer rounded bg-blue-500 p-4 text-white"
            type="file"
            accept={acceptType(fileType)}
            ref={inputRef}
            onChange={handleFileInput}
          />
        </div>
        <div className="relative min-h-fit w-full ">
          <div
            className={`absolute left-0 top-[-15px] m-auto flex gap-5 bg-white text-black`}
          >
            {/* <TableCellsIcon className="h-6 w-6" /> */}
            {title ? title : "Data Table"}
          </div>
          <div className="relative mt-5 min-h-fit w-full max-w-full overflow-auto">
            {dataLoading ? (
              <div className="flex h-fit max-h-fit min-h-fit w-full justify-center overflow-hidden">
                <Spinner size={100} color="#0EA5E9" />
              </div>
            ) : data.length ? (
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

export default MkdFileTable;
