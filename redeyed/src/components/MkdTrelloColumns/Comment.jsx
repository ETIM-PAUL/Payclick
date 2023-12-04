import React from "react";
import moment from "moment";
import MkdSDK from "Utils/MkdSDK";
import { GlobalContext, showToast } from "Context/Global";
import { AuthContext } from "Context/Auth";
import LinkifyText from "./LinkifyText";
import CommentReplyBox from "./CommentReplyBox";

let sdk = new MkdSDK();

const Comment = ({ cardId, comment, deleteComment, getComment }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [commentText, setCommentText] = React.useState();
  const [commentBoxShow, setCommentBoxShow] = React.useState(false);
  const [replyCommentBoxShow, setReplyCommentBoxShow] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = React.useState(20);
  const textareaRef = React.useRef(null);
  const user_id = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (_data) => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/comments/${comment.id}`,
        {
          comment: JSON.stringify(commentText.split(`
`)),
          //   attachment: "/uploads/1678393390494-334071424_1672975889824064_4323871217183033675_n.jpg",
        },
        "PUT"
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

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [commentText]);

  React.useEffect(() => {
    setCommentText(JSON.parse(comment?.comment).join(`
`));
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [commentBoxShow]);

  // console.log(comment.comment, "commentsList");
  return (
    <div className=" mt-4 grid grid-cols-[6%_92%] gap-3 ">
      <div className="">
        {/* <img src="" alt="" className=" h-[40px] w-[40px] rounded-full " /> */}
        {!comment.parent_id && (
          <p className=" flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#c65605] text-[20px] font-bold uppercase text-white ">
            ys
          </p>
        )}
      </div>
      <div className="">
        {commentBoxShow ? (
          <div className="w-full">
            <div className=" bg-white px-4 py-3  ">
              <textarea
                className=" box-initial m-0 min-h-[24px] w-[100%] resize-none border-none p-0 text-[14px] focus:border-none focus:shadow-none focus:outline-none focus:outline-offset-[#fff] "
                aria-label="Write a comment"
                placeholder="Write a comment…"
                dir="auto"
                ref={textareaRef}
                row={1}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  setTextareaHeight(e.target.scrollHeight);
                }}
                autoFocus
                selected
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
        ) : (
          <div className={comment.parent_id ? "ml-auto w-[90%]" : " w-full"}>
            <div className="">
              <span className=" text-[14px] font-bold text-[#172b4d]  ">
                Yea Sin
              </span>{" "}
              <span className=" text-[12px] text-[#172b4d] ">
                {moment(comment.update_at)
                  .startOf(new Date(), "hour")
                  .fromNow()}
              </span>
            </div>

            <LinkifyText
              key={comment.id}
              comment={comment?.comment}
              attachment={comment?.attachment}
            />

            {/* <p className=" w-full bg-white text-left py-2 px-3 rounded  ">
              <div className=" flex justify-end">
                {" "}
                {comment?.attachment && (
                  <a target="_blank" href={comment?.attachment} className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {comment?.comment}
              
            </p>
            <LinkifyText comment={comment} /> */}
            <ul className="ml-2 mt-2 flex ">
              {user_id === comment.user_id && (
                <>
                  <li className=" mr-1 ">
                    <button
                      onClick={() => setCommentBoxShow(!commentBoxShow)}
                      className=" text-[12px] font-semibold text-[#696969] underline "
                    >
                      Edit
                    </button>
                  </li>
                  <p className=" mr-1 font-semibold text-[#696969]"> • </p>
                  <li className="mr-1">
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-[12px] font-semibold text-[#696969] underline "
                    >
                      Delete
                    </button>
                  </li>
                  <p className=" mr-1 font-semibold text-[#696969]"> • </p>
                </>
              )}

              <li className="mr-1">
                <button
                  onClick={() => setReplyCommentBoxShow(!replyCommentBoxShow)}
                  className="text-[12px] font-semibold text-[#696969] underline "
                >
                  Reply
                </button>
              </li>
            </ul>
          </div>
        )}
        {replyCommentBoxShow && (
          <>
            <CommentReplyBox
              parentId={comment.id}
              replyCommentBoxShow={replyCommentBoxShow}
              setReplyCommentBoxShow={setReplyCommentBoxShow}
              cardId={cardId}
              getComment={getComment}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

          