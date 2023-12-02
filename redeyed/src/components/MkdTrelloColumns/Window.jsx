import moment from "moment";
import React from "react";
import Modal from "react-modal";
import AttachmentCard from "./AttachmentCard";
import CardMember from "./CardMember";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";

let sdk = new MkdSDK();

const Window = ({ show, onClose, item }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [currentTableData, setCurrentTableData] = React.useState({});
  const [showAttachments, setShowAttachments] = React.useState(false);
  const [attachmentsList, setAttachmentsList] = React.useState([]);
  const [commentsList, setCommentsList] = React.useState([]);

  async function getData() {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${item.id}`,
        {},
        "GET"
      );
      const result2 = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${item.id}/attachments?order_by=id&direction=asc`,
        {},
        "GET"
      );
      console.log(result2, "result2 attachment");
      setAttachmentsList(result2.list);
      const { model } = result;
      setCurrentTableData(model);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }
  async function getComment() {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${item.id}/comments?order_by=id&direction=desc&limit=20`,
        {},
        "GET"
      );
      console.log(result, "commentsList result");
      setCommentsList(result.list);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  React.useEffect(() => {
    (async function () {
      await getData();
    })();
    (async function () {
      await getComment();
    })();
  }, []);

  // console.log(currentTableData, "on popup card");

  const attachmentHanle = async (e) => {
    console.log(e.target.files);

    try {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      const attachment = await sdk.uploadImage(formData);
      console.log(attachment);
      if (attachment.url) {
        const result = await sdk.callRawAPI(
          `/v2/api/lambda/pm/cards/${item.id}/attachments`,
          {
            name: e.target.files[0].name,
            attachment: attachment.url,
          },
          "POST"
        );
        console.log(result, "attachment  uploaded");
        if (!result.error) {
          showToast(globalDispatch, "Added");
          getData();
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  const deleteAttachment = async (id) => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/attachments/${id}`,
        {},
        "DELETE"
      );
      console.log(result, "attachment  deleted");
      if (!result.error) {
        getData();
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };
  const deleteComment = async (id) => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/comments/${id}`,
        {},
        "DELETE"
      );
      console.log(result, "Comment  deleted");
      if (!result.error) {
        getComment();
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  Modal.setAppElement("body");

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className=" mb-[80px] mt-[48px] h-auto min-h-[450px] w-[800px] overflow-y-auto overflow-x-hidden rounded-sm bg-[#f4f5f7] p-5 "
      overlayClassName=" flex justify-center fixed top-0 left-0 right-0 bottom-0 bg-[#11111170] z-[999]"
    >
      <div className={"flex"}>
        <h1
          className="text-2xl capitalize text-[#6b6c6f]"
          style={{ flex: "1 90%" }}
        >
          {currentTableData.name}
        </h1>
        <button
          className=" flex  h-[35px] w-[35px]  items-center  justify-center rounded-3xl border-none text-lg text-[#031d2c] hover:bg-[#dcdcdc] "
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div>
        {/* <h2 className="text-lg text-[#484848]">Description</h2> */}
        <p className="text-sm font-medium">{item.content}</p>
        {/* <h2>Status {item.icon}</h2> */}
        <p>{/* {item.name} */}</p>
      </div>

      {/* Card member */}

      <CardMember cardId={item.id} />

      <div className=""></div>
      {/* Attachment secttion */}
      <div className="mt-5">
        {attachmentsList.length > 0 ? (
          <div className=" relative mb-4 rounded-sm bg-[#c7c8d400] ">
            <p className=" flex items-center  py-1 text-xl font-semibold capitalize">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-3 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
              attachments
            </p>
          </div>
        ) : (
          <div className=" relative mb-4 rounded-sm bg-[#c7c8d4] ">
            <input
              type="file"
              onChange={attachmentHanle}
              className=" absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 "
            />
            <p className=" px-5 py-1 text-xl font-semibold capitalize  ">
              add attachment
            </p>
          </div>
        )}

        {attachmentsList?.map((attach, i) => (
          <AttachmentCard
            attach={attach}
            key={i}
            deleteAttachment={deleteAttachment}
          />
        ))}
        {attachmentsList.length > 0 && (
          <button className=" relative mt-5 rounded-sm bg-[#c7c8d4] text-lg ">
            <input
              type="file"
              onChange={attachmentHanle}
              className=" absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 "
            />
            <p className=" flex items-center justify-start px-5 py-[3px] text-[16px] font-semibold capitalize text-[#172b4d] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>{" "}
              add attachment
            </p>
          </button>
        )}
      </div>

      {/* Comment secttion */}
      <div className="">
        <div className="mb-4 flex items-center  justify-start py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mr-4 h-6 w-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <p className=" text-xl font-semibold capitalize "> Comments</p>
        </div>

        <CommentForm cardId={item.id} getComment={getComment} />

        {commentsList.length > 0 &&
          commentsList?.map((com, i) => (
            <Comment
              key={i}
              cardId={item.id}
              comment={com}
              getComment={getComment}
              deleteComment={deleteComment}
            />
          ))}
      </div>
    </Modal>
  );
};

export default Window;

          