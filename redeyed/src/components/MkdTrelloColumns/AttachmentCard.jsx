import moment from "moment";
import React from "react";
import AttachmentViewer from "./AttachmentViewer";

const mimetype = {
  gif: "image/gif",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
};

const AttachmentCard = ({ attach, deleteAttachment }) => {
  const [showAttachment, setShowAttachment] = React.useState(false);

  const attachmentObject = {
    uploader: {
      username: "USER_NAME",
      userImage: attach.attachment,
    },
    name: attach.name,
    link: attach.attachment,
    createdAt: attach.create_at,
    // mimetype: mimetype[attach.name.slipt(".")[1]],
    mimetype: "image/png",
  };


  return (
    <>
      <div className="grid grid-cols-[10%_85%] gap-4 mt-2">
        {attach?.name?.split(".")[1] == "pdf" ? (
          <span className="text-[#5e6c84] bg-[#091e420a] flex justify-center items-center font-semibold ">
            PDF
          </span>
        ) : (
          <img src={attach.attachment} className="bg-[#695b46]" alt="" />
        )}

        <div className="">
          <div className=" text-[#172b4d] text-[14px] font-bold">
            <p
              onClick={() => setShowAttachment(true)}
              className=" cursor-pointer inline-block hover:underline "
            >
              {attach.name}
            </p>
          </div>
          <div className="">
            <span className="text-[#5e6c84] text-[14px] font-normal ">
              Added{" "}
              <span
                className=""
                dt={attach.update_at}
                data-date="Thu Mar 09 2023 02:21:21 GMT+0600 (Bangladesh Standard Time)"
                title={moment(attach.update_at).add(0, "days").calendar()}
              >
                {moment(attach.update_at).startOf(new Date(), "hour").fromNow()}
              </span>
            </span>
          </div>

          <p className="">
            <button
              onClick={() => deleteAttachment(attach.id)}
              className="text-[#5e6c84] text-[14px] font-normal underline "
            >
              Delete
            </button>
          </p>
        </div>
      </div>
      {showAttachment ? (
        <AttachmentViewer
          attachment={attach}
          showAttachment={showAttachment}
          setShowAttachment={setShowAttachment}
          onDelete={() => {
            /* Do something (OPTIONAL) */
          }}
        />
      ) : null}
    </>
  );
};

export default AttachmentCard;

          