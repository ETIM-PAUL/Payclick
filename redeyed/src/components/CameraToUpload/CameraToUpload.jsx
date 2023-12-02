
import React, { memo, useEffect, useRef, useState } from "react";
import MkdSDK from "Utils/MkdSDK";
import { AuthContext, tokenExpireError } from "Src/authContext";
import { GlobalContext, showToast } from "Src/globalContext";
import { Spinner } from "Assets/svgs";

const sdk = new MkdSDK();

const CameraToUpload = ({ onSave = undefined, uploadSuccess = undefined }) => {
  const { dispatch, state } = React.useContext(AuthContext);
  const { dispatch: globalDispatch, state: globalState } =
    React.useContext(GlobalContext);

  const photoTrayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [profilePictures, setProfileProfilePictures] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [useFrontCam, setUseFrontCam] = useState(true);
  const [photos, setPhotos] = useState([]);

  const constraints = {
    video: {
      facingMode: { exact: useFrontCam ? "user" : "environment" },
      advanced: [{ zoom: 1 }],
    },
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const aspectRatio = video.videoWidth / video.videoHeight;

    // Calculate the aspect ratio of the video
    let canvasWidth = video.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;

    if (canvasHeight > video.offsetHeight) {
      canvasHeight = video.offsetHeight;
      canvasWidth = canvasHeight * aspectRatio;
    }

    // Set the canvas size based on the aspect ratio of the video
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the current video frame on the canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvasWidth, canvasHeight);

    // Get the data URL of the canvas
    // const dataUrl = canvasRef.current.toDataURL("image/png");
    // setProfileProfilePictures(dataUrl);
    // fileUpload(dataUrl);
    // stopCapture();
    // Draw the video frame on the canvas
    // const context = canvas.getContext("2d");
    // context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas data to a blob
    canvas.toBlob((blob) => {
      // Upload the blob to the server
      // const formData = new FormData();
      setPhotos((prev) => [...prev, blob]);
      if (!photos.length) {
        photoTrayRef.current.style.maxHeight = `150px`;
      }
      // formData.append("file", blob);
      //   fileUpload(blob);
      // console.log(formData);
      //   stopCapture();
      // fetch('/upload', { method: 'POST', body: formData });
    });
  };

  const handleStream = (stream) => {
    const video = videoRef.current;
    video.style.display = "block";
    video.srcObject = stream;
    video.play();
  };
  async function uploadFunction(formData) {
    try {
      let uploadResult = await sdk.uploadImage(formData);

      if (!uploadResult.error) {
        return uploadResult?.url; // Return the response data from the server
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const handleUpload = async () => {
    if (!uploadSuccess) {
      throw new Error("uploadSuccess is not a function");
    }
    setSubmitLoading(true);
    try {
      if (photos && photos.length) {
        const uploadPromises = photos.map(async (item) => {
          let formData = new FormData();
          formData.append("file", item);

          // Perform the upload operation for 'item' and return the result
          return uploadFunction(formData); // Replace 'uploadFunction' with your actual upload logic
        });
        const uploadResults = await Promise.all(uploadPromises);
        // Process uploadResults if needed
        console.log(uploadResults);
        showToast(globalDispatch, "Upload Successful", 5000, "success");
        uploadSuccess(uploadResults);
      }
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      tokenExpireError(
        dispatch,
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
      );
      showToast(
        globalDispatch,
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
        5000,
        "error"
      );
      console.log(error.message);
      // Handle errors
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(photos);
    }
  };

  const handleError = (error) => {
    console.error("Error accessing camera:", error);
  };

  const startCapture = async () => {
    try {
      // Request access to the camera
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setShowCamera(true);
      // Display the camera feed on the video element
      handleStream(stream);
    } catch (error) {
      handleError(error);
    }
  };

  const stopCapture = () => {
    // Stop all tracks in the stream
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setPhotos(() => []);
    // // Clear the stream from state
    // setStream(null);
    setShowCamera(false);
    // Release the camera resources
    videoRef.current.srcObject = null;
  };
  const removeItem = (index) => {
    const tempPhotos = [...photos];
    tempPhotos.splice(index, 1);
    setPhotos(() => [...tempPhotos]);
  };

  useEffect(() => {
    if (photos.length === 0) {
      photoTrayRef.current.style.maxHeight = null;
    }
    // console.log(photos);
  }, [photos.length]);
  useEffect(() => {
    startCapture(true);
  }, [useFrontCam]);

  return (
    <>
      <fieldset
        className={`cus-input mt-5 block w-full cursor-pointer md:w-[23rem] `}
      >
        <div className="relative mb-2 flex  h-[4.125rem] w-full items-center  rounded-[1.25rem_1.25rem_0rem_1.25rem] border border-blue-600 ">
          <div
            id="profile_picture"
            // {...register("profile_picture")}
            className={`flex h-full grow items-center justify-center rounded-[1.25rem]  bg-white text-[1.375rem] text-black`}
          >
            <span className="block md:hidden">Take picture now</span>
            <span className="hidden text-xs md:block">
              Switch to Mobile to take picture
            </span>
          </div>
          <div
            onClick={() => startCapture()}
            className={`flex h-full w-[5.625rem] min-w-[5.625rem] items-center justify-center rounded-[0rem_1.25rem] bg-blue-600 md:hidden`}
          >
            camera
          </div>
        </div>
        <p className="text-field-error mb-5 italic text-red-500"></p>
      </fieldset>

      <div
        className={`${
          showCamera
            ? "fixed left-0 right-0 top-0 z-[99999999] m-auto block h-screen w-full"
            : "hidden"
        }`}
      >
        <div className={`relative h-screen w-full  bg-black`}>
          <video
            ref={videoRef}
            className={`relative z-[99999999] h-screen w-full  object-cover`}
            style={{ transform: "rotateY(180deg)" }}
          />
          <div
            className={`${
              submitLoading ? "flex" : "hidden"
            } absolute inset-0 z-[999999992] m-auto h-full w-full items-center justify-center `}
          >
            <Spinner size={100} color="#0EA5E9" />
          </div>
          {!submitLoading ? (
            <div
              className={`absolute inset-x-0 top-0 z-[999999991] m-auto flex h-fit w-full cursor-pointer flex-col flex-wrap items-center justify-center gap-5 pr-2 text-[2rem] text-black`}
            >
              <div
                onClick={() => stopCapture()}
                className={`relative flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-center self-end rounded-[50%] bg-white text-lg leading-[50px] text-black`}
              >
                x
              </div>
              <div className="flex w-full justify-end gap-5">
                <div
                  className={`${
                    photos.length && onSave ? "block" : "hidden"
                  } text-sm`}
                  onClick={() => handleSave()}
                >
                  save {photos.length > 1 ? "photos" : "photo"}
                </div>
                <div
                  className={`${photos.length ? "block" : "hidden"} text-sm`}
                  onClick={() => handleUpload()}
                >
                  upload {photos.length > 1 ? "photos" : "photo"}
                </div>
                <div
                  className={`${photos.length ? "block" : "hidden"} text-sm`}
                  onClick={() => setPhotos(() => [])}
                >
                  clear
                </div>
                <div
                  className="text-sm"
                  onClick={() => setUseFrontCam(!useFrontCam)}
                >
                  {useFrontCam ? "Use Rare Cam" : "Use Front Cam"}
                </div>
              </div>
            </div>
          ) : null}

          <div
            onClick={() => handleCapture()}
            className={`absolute inset-x-0 ${
              photos.length ? "bottom-[5.5625rem]" : "bottom-8"
            } z-[999999991] m-auto flex h-[3.75rem] w-[3.75rem] cursor-pointer items-center justify-center rounded-[50%] bg-white text-[1rem] text-black transition-all`}
          >
            <div
              className={`relative inset-x-0 z-[999999991] m-auto flex h-[50%] w-[50%] cursor-pointer items-center justify-center rounded-md bg-black`}
            ></div>
          </div>
          <div
            ref={photoTrayRef}
            className={`absolute bottom-0 left-0 right-0 z-[999999991] m-auto flex max-h-0 w-full items-center justify-start gap-2 overflow-x-auto overflow-y-hidden  transition-all`}
          >
            {photos.length
              ? photos.map((photo, photoKey) => (
                  <div
                    key={photoKey}
                    className="relative h-full w-[5rem] min-w-[5rem] max-w-[5rem] rounded-md bg-white"
                  >
                    <img
                      style={{ transform: "rotateY(180deg)" }}
                      className="h-full w-full rounded-md"
                      src={URL.createObjectURL(photo)}
                    />
                    {!submitLoading ? (
                      <div
                        onClick={() => removeItem(photoKey)}
                        className={`absolute right-0 top-0 z-[999999991] m-auto flex h-[1rem] w-[1rem] cursor-pointer items-center justify-center rounded-[50%] text-sm leading-[0.5rem_!important] text-red-600`}
                      >
                        x
                      </div>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: "none", transform: "rotateY(180deg)" }}
      />
    </>
  );
};

export default memo(CameraToUpload);
