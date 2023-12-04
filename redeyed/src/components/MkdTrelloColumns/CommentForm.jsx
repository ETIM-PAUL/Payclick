import React from "react";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";

let sdk = new MkdSDK();

const CommentForm = ({ cardId, getComment }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [commentText, setCommentText] = React.useState("");
  const [commentBoxShow, setCommentBoxShow] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = React.useState(20);
  const [attachment, setAttachment] = React.useState("");
  const textareaRef = React.useRef(null);

  const onSubmit = async (_data) => {
    try {
      let formData = new FormData();
      formData.append("file", attachment);
      const attachmentUrl = await sdk.uploadImage(formData);
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/comments`,
        {
          comment: JSON.stringify(commentText.split(`
`)),
          attachment: attachmentUrl.url ? attachmentUrl.url : "",
        },
        "POST"
      );
      console.log(result);
      if (!result.error) {
        showToast(globalDispatch, "Comment is Added");
        // getData();
        setCommentText("");
        setCommentBoxShow(!commentBoxShow);
        getComment();
      }
    } catch (error) {
      console.log("Error", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  const attachmentHanle = async (e) => {
    setAttachment(e.target.files[0]);
    console.log(e.target.files[0].name);

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
  console.log(commentText.split(`
`));
  return (
    <div className=" grid grid-cols-[6%_92%] gap-3 ">
      <div className="">
        {/* <img src="" alt="" className=" h-[40px] w-[40px] rounded-full " /> */}
        <p className=" flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#c65605] text-[20px] font-bold uppercase text-white ">
          ys
        </p>
      </div>
      {commentBoxShow ? (
        <div className="w-full">
          <div className=" bg-white px-4 py-3  ">
            <textarea
              className=" box-initial m-0 h-[24px] min-h-[24px] w-[100%] resize-none border-none p-0 text-[14px] focus:border-none focus:shadow-none focus:outline-none focus:outline-offset-[#fff] "
              aria-label="Write a comment"
              placeholder="Write a comment…"
              dir="auto"
              ref={textareaRef}
              row={1}
              autoFocus
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
                  onClick={() => setCommentBoxShow(!commentBoxShow)}
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
                <li className=" relative flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded bg-transparent hover:bg-[#dcdcdc] ">
                  <input
                    type="file"
                    onChange={attachmentHanle}
                    className=" absolute z-[99] opacity-0 "
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 "
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
      ) : (
        <button
          onClick={() => setCommentBoxShow(!commentBoxShow)}
          className=" w-full rounded bg-white px-3 py-2 text-left hover:bg-[#eaeaea] "
        >
          Write a comment…
        </button>
      )}
    </div>
  );
};

export default CommentForm;

          