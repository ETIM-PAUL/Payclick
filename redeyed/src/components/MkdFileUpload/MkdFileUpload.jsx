
import React, { useId, useRef, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const acceptType = (fileType) => {
  switch (fileType) {
    case "excel":
    case "xls":
    case "xlsx":
    case ".xlsx":
    case ".xls":
    case ".xlsx,.xls":
    case "xlsx,xls":
    case ".xls,.xlsx":
    case "xls,xlsx":
      return ".xlsx,.xls";
    case "csv":
    case ".csv":
      return ".csv";
    case ".png":
    case "png":
      return ".png";
    case ".jpg":
    case "jpg":
      return ".jpg";
    case ".jpeg":
    case "jpeg":
      return ".jpeg";
    case "image":
    case ".png,.jpg,.jpeg":
    case ".png,.jpeg,.jpg":
    case ".jpg,.png,.jpeg":
    case ".jpg,.jpeg,.png":
    case ".jpeg,.png,.jpg":
    case ".jpeg,.jpg,.png":
      return ".png,.jpg,.jpeg";
    case "doc":
    case "docx":
    case "document":
    case ".doc":
    case ".docx":
    case ".docx,.doc":
    case ".doc,.docx":
    case "docx,doc":
    case "doc,docx":
      return ".docx,.doc";
    case "pdf":
    case ".pdf":
      return ".pdf";
    default:
      return "*";
  }
};
const transformFileType = (fileType) => {
  switch (fileType) {
    case "excel":
    case "xls":
    case "xlsx":
    case ".xlsx":
    case ".xls":
    case ".xlsx,.xls":
    case "xlsx,xls":
    case ".xls,.xlsx":
    case "xls,xlsx":
      return "an excel";
    case "csv":
    case ".csv":
      return "a csv";
    case ".png":
    case "png":
      return "a png";
    case ".jpg":
    case "jpg":
      return "a jpg";
    case ".jpeg":
    case "jpeg":
      return "a jpeg";
    case "image":
    case ".png,.jpg,.jpeg":
    case ".png,.jpeg,.jpg":
    case ".jpg,.png,.jpeg":
    case ".jpg,.jpeg,.png":
    case ".jpeg,.png,.jpg":
    case ".jpeg,.jpg,.png":
      return "an image";
    case "doc":
    case "docx":
    case "document":
    case ".doc":
    case ".docx":
    case ".docx,.doc":
    case ".doc,.docx":
    case "docx,doc":
    case "doc,docx":
      return "a word document";
    case "pdf":
    case ".pdf":
      return "a pdf";
    default:
      return "any";
  }
};
const testFileTypeToRender = (fileType) => {
  switch (fileType) {
    case "excel":
    case "xls":
    case "xlsx":
    case ".xlsx":
    case ".xls":
    case ".xlsx,.xls":
    case "xlsx,xls":
    case ".xls,.xlsx":
    case "xls,xlsx":
      return "excel";
    case "csv":
    case ".csv":
      return "csv";
    case ".png":
    case "png":
      return "image";
    case ".jpg":
    case "jpg":
      return "image";
    case ".jpeg":
    case "jpeg":
      return "image";
    case "image":
    case ".png,.jpg,.jpeg":
    case ".png,.jpeg,.jpg":
    case ".jpg,.png,.jpeg":
    case ".jpg,.jpeg,.png":
    case ".jpeg,.png,.jpg":
    case ".jpeg,.jpg,.png":
      return "image";
    case "doc":
    case "docx":
    case "document":
    case ".doc":
    case ".docx":
    case ".docx,.doc":
    case ".doc,.docx":
    case "docx,doc":
    case "doc,docx":
      return "document";
    case "pdf":
    case ".pdf":
      return "pdf";
    // default:
    //   return "any";
  }
};
const MkdFileUpload = ({
  fileType,
  name = "fileData",
  multiple = false,
  onAddSuccess,
}) => {
  const fileInputId = useId();
  const inputRef = useRef(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileObj, setFileObj] = React.useState({});

  const onAddFile = (field, target, multiple = false) => {
    let tempFileObj = fileObj;
    // console.log(target);
    if (multiple) {
      if (tempFileObj[field]) {
        tempFileObj[field] = [
          ...tempFileObj[field],
          {
            file: target.files[0],
            tempFile: {
              url: URL.createObjectURL(target.files[0]),
              name: target.files[0].name,
              type: target.files[0].type,
            },
          },
        ];
      } else {
        tempFileObj[field] = [
          {
            file: target.files[0],
            tempFile: {
              url: URL.createObjectURL(target.files[0]),
              name: target.files[0].name,
              type: target.files[0].type,
            },
          },
        ];
      }
    } else {
      tempFileObj[field] = {
        file: target.files[0],
        tempFile: {
          url: URL.createObjectURL(target.files[0]),
          name: target.files[0].name,
          type: target.files[0].type,
        },
      };
    }
    setFileObj({ ...tempFileObj });
    onAddSuccess({ ...tempFileObj });
  };
  const updateAssets = (field, data, multiple = false) => {
    let tempFileObj = fileObj;
    if (multiple) {
      if (tempFileObj[field]) {
        tempFileObj[field] = [
          ...tempFileObj[field],
          ...data.map((item) => ({ file: null, tempFile: item })),
        ];
      } else {
        tempFileObj[field] = [
          ...data.map((item) => ({ file: null, tempFile: item })),
        ];
      }
    } else {
      tempFileObj[field] = {
        file: null,
        tempURL: data,
      };
    }
    setFileObj({ ...tempFileObj });
  };

  const removeItem = (index) => {
    let tempFileObj = fileObj;

    if (multiple) {
      let tempFiles = tempFileObj[name];
      tempFiles.splice(index, 1);
      tempFileObj[name] = [...tempFiles];
    } else {
      tempFileObj[name] = null;
    }

    setFileObj({ ...tempFileObj });
  };

  const handleExcelFile = (e, dnd = false) => {
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

  const handleCsvFile = (e, dnd = false) => {
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
  const handleImageFile = (e, dnd = false) => {
    try {
      // setData(() => []);
      // setDataLoading(true);
      // const file = e.target.files[0];
      onAddFile(name, dnd ? e.dataTransfer : { files: e }, multiple);
      inputRef.current.value = "";
      // setDataLoading(false);
    } catch (error) {
      inputRef.current.value = "";
      // setDataLoading(false);
    }
  };
  const handleDocumentFile = (e, dnd = falsee) => {
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
  const handlePdfFile = (e, dnd = false) => {
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

  const handleFileInput = (e, dnd = false) => {
    // console.log(e.target.files);
    // console.log(inputRef.current.files);
    onAddFile(name, dnd ? e.dataTransfer : e.target, multiple);
    inputRef.current.value = "";
    // return;
    // if (givenType === "image") {
    // } else if (givenType === "excel") {
    //   return handleExcelFile(dnd ? e : e.target.files, dnd);
    // } else if (givenType === "csv") {
    //   return handleCsvFile(dnd ? e : e.target.files, dnd);
    // } else if (givenType === "document") {
    //   return handleDocumentFile(dnd ? e : e.target.files, dnd);
    // } else if (givenType === "pdf") {
    //   return handlePdfFile(dnd ? e : e.target.files, dnd);
    // }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = e.dataTransfer.files;
    console.log(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      setUploadedFile(file);
      handleFileInput(e, true);
    }
  };

  const handleFileUpload = () => {
    // Implement your file upload logic here using FormData or other methods.
    if (uploadedFile) {
      console.log("Uploading file:", uploadedFile);
      // Reset uploadedFile state after successful upload.
      setUploadedFile(null);
    }
  };

  return (
    <>
      <input
        id={fileInputId}
        disabled={dataLoading}
        className="hidden w-[20%] cursor-pointer rounded bg-blue-500 p-4 text-white"
        type="file"
        accept={acceptType(fileType)}
        ref={inputRef}
        onChange={handleFileInput}
      />
      <div
        // className={`file-uploader ${dragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`min-h-[9.375rem] w-full cursor-pointer rounded-md border-[.3125rem] border-dashed md:w-[31.25rem]  md:min-w-[31.25rem] md:max-w-[31.25rem] ${
          dragging ? "border-green-500" : "border-blue-500"
        }`}
      >
        <div className="flex h-full max-h-full min-h-full w-full min-w-full max-w-full flex-col items-center justify-center py-4">
          <div className="flex flex-col items-center ">
            <div className="mb-2 font-bold">
              Select/Drag and Drop {transformFileType(fileType)} File.
            </div>
            <div
              className="flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-md border bg-blue-500 text-white"
              onClick={() => inputRef.current.click()}
            >
              Select File
            </div>
          </div>
          <div className="flex h-[100px] w-full  overflow-auto">
            {multiple && fileObj[name] && fileObj[name].length ? (
              <>
                {testFileTypeToRender(fileType) === "image"
                  ? fileObj[name].map((photo, photoKey) => (
                      <img
                        key={photoKey}
                        src={photo["tempFile"]["url"]}
                        className="h-full"
                        title={photo["tempFile"]["name"]}
                      />
                    ))
                  : null}
              </>
            ) : !multiple && fileObj[name] ? (
              <>
                {testFileTypeToRender(fileType) === "image" ? (
                  <div className="relative">
                    <img
                      src={fileObj[name]["tempFile"]["url"]}
                      className="h-full"
                      title={fileObj[name]["tempFile"]["name"]}
                    />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

// <input type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />

export default MkdFileUpload;
