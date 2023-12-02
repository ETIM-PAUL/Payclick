import { useContext, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

import Message from "./Message";
import { homePage } from "./ChatUtils";

import MkdSDK from "Utils/MkdSDK";
import { GlobalContext } from "Context/Global";
import { AuthContext, tokenExpireError } from "Context/Auth";

const Chat = (props) => {
  const { toggleComponentVisibility, index, currentRoom } = props;

  const { state, dispatch } = useContext(GlobalContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const bottomOfChatRef = useRef(null);

  let sdk = new MkdSDK();

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async (e) => {
    // Don't send empty messages
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
      dispatch({
        type: "SETROOM",
        payload: { position: props.index, value: message },
      });
    }

    setIsLoading(true);

    // Add the message to the conversation
    setConversation([
      ...conversation,
      { content: message, role: "user", content2: null, role2: "system" },
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);

    try {
      setGenerating(true);
      const response = await sdk.chatGPT(message);

      if (response.ok) {
        const data = await response.json();
        setGenerating(false);

        // Add the message to the conversation
        setConversation([
          ...conversation,
          {
            content: message,
            role: "user",
            content2: data.Answer,
            role2: "system",
          },
        ]);
      } else {
        console.error(response);
        setGenerating(false);

        setErrorMessage(response.statusText);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setGenerating(false);
      setErrorMessage(error.message);
      tokenExpireError(
        authDispatch,
        error?.response?.data?.messsage
          ? error?.response?.data?.messsage
          : error?.message
      );
      setIsLoading(false);
    }
  };

  const handleKeypress = (e) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
    <div
      className={`${
        index !== currentRoom && "hidden"
      } flex max-w-full flex-1 flex-col dark:bg-gray-800`}
    >
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div>
      <div className="transition-width  relative mx-auto flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
        <div className="overflow-scroll sm:h-[700px]">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk dark:bg-gray-800">
            <div
              className={`react-scroll-to-bottom--css-ikyem-1n7m0yu ${
                !showEmptyChat && conversation.length ? " sm:mt-2" : "sm:mt-20"
              }`}
            >
              {!showEmptyChat && conversation.length > 0 ? (
                <div className="flex flex-col items-center bg-gray-800 text-sm">
                  <Message
                    generating={generating}
                    conversation={conversation}
                    message={message}
                    genert
                  />
                  <div className="h-32 w-full flex-shrink-0 md:h-48"></div>
                  <div ref={bottomOfChatRef}></div>
                </div>
              ) : null}
              {showEmptyChat ? (
                <div className="relative mx-auto mb-28 h-full max-w-[90%] py-10 sm:mb-0 sm:max-w-[80%]">
                  <h1 className="flex items-center justify-center gap-2 text-center text-4xl font-bold text-[white]">
                    ChatGPT
                  </h1>
                  <div className="mt-5 items-center gap-4 sm:mt-10 sm:flex sm:flex-wrap sm:justify-center">
                    {homePage.map((item, index) => (
                      <div key={index}>
                        <div className="mt-4 flex items-center justify-center gap-2 sm:mt-0 sm:grid">
                          <span className="flex justify-center text-center text-2xl text-[white] sm:mt-4">
                            {item.icon}
                          </span>
                          <h3 className="text-lg text-gray-100 sm:my-3">
                            {item.title}
                          </h3>
                        </div>
                        <div className="mt-4 sm:mt-10">
                          {item.details.map((details, index) => (
                            <div
                              key={index}
                              className="mb-4 w-full rounded-md bg-gray-500 px-2 py-4 text-sm text-gray-100 sm:my-4 sm:w-[250px]"
                            >
                              {details}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="md:bg-vert-light-gradient dark:md:bg-vert-dark-gradient absolute bottom-0 left-0 w-full border-t bg-white pt-2 dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent md:dark:border-transparent">
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 flex-col items-stretch md:flex-col">
              <div className="relative flex h-[55px] w-full flex-grow items-center rounded-md border border-black/10 bg-white px-4 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  // ref={textAreaRef}
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "24px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  // rows={1}
                  placeholder="Send a message"
                  className="m-0 flex h-6 w-full resize-none items-center border-0 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeypress}
                />
                <button
                  disabled={isLoading || message?.length === 0}
                  onClick={() => sendMessage()}
                  className={`absolute right-1 rounded-md bg-green-500 bg-transparent p-1 disabled:bg-gray-500 disabled:opacity-40 md:right-2`}
                >
                  <FiSend className="mr-1 h-4 w-4 text-white " />
                </button>
              </div>
            </div>
          </form>
          {errorMessage ? (
            <div className="mb-2 md:mb-0">
              <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2">
                <span className="text-sm text-red-500">{errorMessage}</span>
              </div>
            </div>
          ) : null}
          <div className="px-3 pb-3 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pb-6 md:pt-3">
            <span>
              ChatGPT may produce inaccurate information about people, places,
              or facts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

          