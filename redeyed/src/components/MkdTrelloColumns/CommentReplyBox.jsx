import React from "react";
  import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";

const CommentReplyBox = ({
  replyCommentBoxShow,
  setReplyCommentBoxShow,
  parentId,
  cardId,
  getComment,
}) => {
  let sdk = new MkdSDK();

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [commentText, setCommentText] = React.useState();
  const [commentBoxShow, setCommentBoxShow] = React.useState(false);
  const [attachment, setAttachment] = React.useState("");
  //   const [replyCommentBoxShow, setReplyCommentBoxShow] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = React.useState(20);

  const textareaRef = React.useRef(null);
  const user_id = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (_data) => {
    try {
      let formData = new FormData();
      formData.append("file", attachment);
      const attachment = await sdk.uploadImage(formData);
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/comments`,
        {
          comment: JSON.stringify(commentText.split(`
`)),
          parent_id: parentId,
          attachment: attachment.url ? attachment.url : "",
        },
        "POST"
      );
      console.log(result);
      if (!result.error) {
        showToast(globalDispatch, "Comment is Added");
        // getData();
        setCommentText("");
        setReplyCommentBoxShow(!replyCommentBoxShow);
        getComment();
      }
    } catch (error) {
      console.log("Error", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  const attachmentHanle = async (e) => {
    let sdk = new MkdSDK();
    console.log(e.target.files);
    console.log(e.target.files[0].name);
    setAttachment(e.target.files[0]);

    // try {
    //   let formData = new FormData();
    //   formData.append("file", e.target.files[0]);
    //   const attachment = await sdk.uploadImage(formData);
    //   console.log(attachment);
    //   if (attachment.url) {
    //     setAttachmentUrl(attachment.url);
    //     const result = await sdk.callRawAPI(
    //       `/v2/api/lambda/pm/cards/${cardId}/attachments`,
    //       {
    //         name: e.target.files[0].name,
    //         attachment: attachment.url,
    //       },
    //       "POST"
    //     );
    //     console.log(result, "attachment  uploaded");
    //     if (!result.error) {
    //       setCommentText(
    //         `${commentText} [${e.target.files[0].name}] (${attachment.url})`
    //       );
    //     }
    //   }
    // } catch (error) {
    //   console.log("ERROR", error);
    //   tokenExpireError(dispatch, error.message);
    // }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [commentText]);

  return (
    <div className="ml-auto mt-3 w-[90%] ">
      <div className=" bg-white px-4 py-3  ">
        <textarea
          className=" box-initial m-0 h-[24px] min-h-[24px] w-[100%] resize-none border-none p-0 text-[14px] focus:border-none focus:shadow-none focus:outline-none focus:outline-offset-[#fff] "
          aria-label="Write a comment"
          placeholder="Write a comment…"
          dir="auto"
          ref={textareaRef}
          row={1}
          onChange={(e) => {
            setCommentText(e.target.value);
            setTextareaHeight(e.target.scrollHeight);
          }}
          value={commentText}
          data-autosize="true"
          style={{
            overflow: "hidden",
            overflowWrap: "break-word",
            // height: textareaHeight,
          }}
          spellCheck="false"
        ></textarea>

        <div className="mt-3 flex items-center justify-between">
          <div className=" flex">
            {commentText ? (
              <button
                onClick={onSubmit}
                className={`rounded bg-[#1e74b6] px-4 py-1 text-lg font-semibold  capitalize text-[#fff] hover:bg-[#0b4877]`}
              >
                Save
              </button>
            ) : (
              <button
                className={`rounded bg-[#e0e0e0] px-4 py-1 text-lg  font-semibold capitalize text-[#a9a9a9]`}
                disabled
              >
                Save
              </button>
            )}
            <button
              type="button"
              onClick={() => setReplyCommentBoxShow(!replyCommentBoxShow)}
              className=" ml-2 flex items-center justify-start rounded-[3px] bg-transparent px-4 py-1 text-[16px] text-[#172b4d] hover:bg-[#aeaeae] "
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
          <ul className="">
            <li className=" flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded bg-transparent hover:bg-[#dcdcdc] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-[14px] w-[14px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyBox;

          