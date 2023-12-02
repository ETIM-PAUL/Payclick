import { useEffect, useState } from "react";

import { SiOpenai } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";
import { TbCursorText } from "react-icons/tb";
import TypingEffect from "./TypingEffect";

const Message = (props) => {
  const { conversation, generating } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(conversation.length - 1);
  }, [conversation]);

  return (
    <>
      <div
        className={`mb- group w-full border-b border-black/10 text-gray-800 dark:text-gray-100 `}
      >
        <div className="m-auto flex w-full items-center justify-center gap-4 py-2 text-base dark:border-gray-900/50 dark:bg-gray-500 sm:py-0 md:gap-6 lg:px-0">
          <div className="ml-4 flex gap-1 text-start text-xs">
            <button
              className="text-gray-300 dark:text-gray-400"
              disabled={currentIndex + 1 === 1}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              &lt;
            </button>
            <span className="flex-shrink-0 flex-grow">
              {currentIndex + 1} / {conversation?.length}
            </span>
            <button
              disabled={currentIndex + 1 === conversation.length}
              className="text-gray-300 dark:text-gray-400"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              &gt;
            </button>
          </div>
          <div className="my-auto flex w-full flex-row gap-4 pl-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
            <div className="relative flex w-8 flex-col items-end">
              <div className="text-opacity-100r relative flex h-7 w-7 items-center justify-center rounded-sm bg-green-600 p-1 text-white">
                <FaUserAlt className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 text-start md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div className="markdown prose dark:prose-invert dark w-full break-words">
                    <p>{conversation[currentIndex]["content"]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mr m-auto mt-2 flex w-full gap-4 text-base md:max-w-2xl md:gap-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
          <div className="m-auto flex w-full flex-row gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
            <div className="relative flex w-8 flex-col items-end">
              <div className="text-opacity-100r relative flex h-7 w-7 items-center justify-center rounded-sm bg-green-600 p-1 text-white">
                <SiOpenai className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 text-start md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div className="markdown prose dark:prose-invert dark w-full break-words">
                    {generating ? (
                      <div className="flex items-center gap-3">
                        <TbCursorText className="h-6 w-6 animate-pulse" />
                        <span className="text-lg font-bold">
                          Generating Response...
                        </span>
                      </div>
                    ) : (
                      <p>
                        <TypingEffect
                          phrase={conversation[currentIndex]["content2"]}
                        />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;

          