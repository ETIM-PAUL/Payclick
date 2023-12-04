
import React, { useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard, useUppy } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

import MkdSDK from "Utils/MkdSDK";
import { GlobalContext, showToast } from "Context/Global";
import { useNavigate } from "react-router";
let sdk = new MkdSDK();

const AddAdminPhotoPage = () => {
  const { dispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const uppy = useUppy(() => {
    let model = new Uppy();
    model.use(XHRUpload, {
      id: "XHRUpload",
      method: "post",
      formData: true,
      limit: 0,
      fieldName: "file",
      metaFields: ["caption", "size"],
      headers: sdk.getHeader(),
      endpoint: sdk.uploadUrl(),
    });

    model.on("file-added", (file) => {
      model.setFileMeta(file.id, {
        size: file.size,
        caption: "",
      });
    });

    model.on("upload-success", async (file, response) => {
      const httpStatus = response.status; // HTTP status code
      const responseBody = response.body;
      console.log("response", response);
      showToast(globalDispatch, "Uploaded");
      navigate("/admin/photos");
    });

    model.on("upload-error", (file, error, response) => {
      const httpStatus = response.status; // HTTP status code
      if (httpStatus == 401) {
        tokenExpireError(dispatch, "TOKEN_EXPIRED");
      }
    });
    return model;
  });

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "photos",
      },
    });
  }, []);

  return (
    <div className="relative p-6 flex-auto">
      <h4 className="text-2xl font-medium mb-2">Add Photo</h4>
      <Dashboard uppy={uppy} />
    </div>
  );
};

export default AddAdminPhotoPage;
