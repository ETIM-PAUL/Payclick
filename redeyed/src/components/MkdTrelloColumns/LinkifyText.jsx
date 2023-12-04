import React from "react";

const LinkifyText = ({ comment, attachment }) => {
  //   React.useEffect(() => {
  //     JSON.parse(comment).map((com) => {
  //       let parts = com.match(/(?<=[).*?(?=])/g);
  //       let parts2 = com.match(/(([^)]+))/);
  //       console.log(com.split("["), "linked text");
  //     });
  //   }, []);
  return (
    <div className=" w-full rounded bg-white px-3 py-2 text-left " disabled>
      <div className=" flex justify-end">
        {" "}
        {attachment && (
          <a target="_blank" href={attachment} className=" ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-[18px] w-[18px]"
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
      {comment
        ? JSON.parse(comment).map((com, i) => (
            <span key={i}>
              {com.match(/(([^)]+))/) ? (
                <>
                  {com.split("[")[0]}
                  <a
                    className="text-[#2a6ece]"
                    href={com.match(/(([^)]+))/)[1]}
                    target="_blank"
                    key={i}
                  >
                    {com.match(/(?<=[).*?(?=])/g)[0]}
                  </a>
                  {com.split(")")[1]}
                </>
              ) : (
                com
              )}
              <br />
            </span>
          ))
        : "N/A"}
      {/* {comment?.comment ? comment?.comment : "N/A"} */}
    </div>
  );
};

export default LinkifyText;

          