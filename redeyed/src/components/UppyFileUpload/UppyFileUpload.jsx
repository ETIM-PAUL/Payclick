import React, { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import Tus from "@uppy/tus";
import GoogleDrive from "@uppy/google-drive";
import Instagram from '@uppy/instagram';
import Facebook from '@uppy/facebook';
import { Dashboard, ProgressBar, FileInput } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import '@uppy/webcam/dist/style.min.css';
import MkdSDK from "Utils/MkdSDK";

const sdk = new MkdSDK();

export default function UppyFileUpload({ companionUrl, setFileProcessedUrl }) {
  const handleImageChange = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await sdk.uploadImage(formData);
      console.log(result.url);
      if (setFileProcessedUrl) {
        setFileProcessedUrl(result.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uppy = new Uppy({ id: "uppy1", autoProceed: true, debug: true })
    // .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
    .use(GoogleDrive, {
      companionUrl: companionUrl || "https://companion.uppy.io",
    })
    .use(Webcam)
    .use(Instagram, {
      companionUrl: companionUrl || "https://companion.uppy.io",
    })
    .use(Facebook, {
      companionUrl: companionUrl || "https://companion.uppy.io",
    })

  const uppy3 = new Uppy({ autoProceed: false, allowMultipleUploadBatches: false });

  uppy3.on("file-added", (file) => {
    handleImageChange(file.data);
  });

  uppy.on("file-added", (file) => {
    handleImageChange(file.data);
  });

  // uppy.on('complete', (file) => {
  //   console.log("Complete action", file)
  // });

  useEffect(() => {
    return () => {
      uppy.close({ reason: "unmount" });
      // uppy2.close({ reason: 'unmount' });
    };
  }, [uppy]);

  return (
    <div>
      <h2>File Uploader</h2>

      <Dashboard
        uppy={uppy}
        plugins={["GoogleDrive", "Webcam", "OneDrive", "Instagram", "Facebook"]}
        metaFields={[
          { id: "name", name: "MkdUppyFileUploader", placeholder: "File name" },
        ]}
      />

      <h2>Progress Bar</h2>
      <ProgressBar uppy={uppy} hideAfterFinish={false} />

      <h2>File Input</h2>
      <FileInput uppy={uppy3} />
    </div>
  );
}
