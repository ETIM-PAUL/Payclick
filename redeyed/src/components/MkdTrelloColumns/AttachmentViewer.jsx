import React from "react";

const AttachmentViewer = ({
  attachment,
  showAttachment,
  setShowAttachment,
}) => {
  return (
    <div className=" fixed top-0 left-0 w-full h-full z-[999999999] ">
      <div
        onClick={() => setShowAttachment(false)}
        className=" absolute top-0 left-0 w-full h-full bg-[#0000004f] "
      >
        <button
          className=" h-[35px]  w-[35px] text-lg  text-[#ffffff]  border-none rounded-3xl bg-[#000000] flex justify-center items-center absolute top-[2%] right-[2%] z-[999999999] "
          onClick={() => setShowAttachment(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <a
          href={attachment.attachment}
          className=" h-[35px]  w-[35px] text-lg  text-[#ffffff]  border-none rounded-3xl bg-[#000000] flex justify-center items-center absolute top-[2%] right-[6%] z-[999999999]"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </a>
        <div className="">
          {/* <img
            src={attachment.attachment}
            alt={attachment.name}
            className="w-1/2 mx-auto h-[95vh] my-auto mt-5 "
          /> */}

          {attachment?.name?.split(".")[1] == "pdf" ? (
            <embed
              src={attachment.attachment}
              className="w-1/2 mx-auto h-[95vh] mt-5 "
            />
          ) : (
            <img
              src={attachment.attachment}
              alt={attachment.name}
              className="w-1/2 mx-auto h-[95vh] my-auto mt-5 "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentViewer;

          