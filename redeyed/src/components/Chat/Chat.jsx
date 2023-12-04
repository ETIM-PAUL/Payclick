
  import React from "react";
  import MkdSDK from "Utils/MkdSDK";
  
  import moment from "moment";
  import { ImagePreviewModal } from "Components/ImagePreviewModal";
  import { CreateNewRoomModal } from "Components/CreateNewRoomModal";
  import {
    UserCircleIcon,
    PaperAirplaneIcon,
    ArrowLeftIcon,
    PaperClipIcon,
  } from "@heroicons/react/20/solid";
  import { FaceSmileIcon } from "@heroicons/react/24/outline";
  import { AuthContext, tokenExpireError } from "Src/authContext";
  import InputEmoji from "react-input-emoji";
  import { renderName } from "Components/CreateNewRoomModal";
  
  const Chat = ({roles=[]}) => {
    const { state } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const [rooms, setRooms] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [chatId, setChatId] = React.useState();
    const otherUserId = React.useRef();
    const currentRooms = React.useRef();
    const inputRef = React.useRef(null);
    const [message, setMessage] = React.useState("");
    const [roomId, setRoomId] = React.useState();
    const [file, setFile] = React.useState(null);
    const [previewModal, showPreviewModal] = React.useState(false);
    const [screenSize, setScreenSize] = React.useState(window.innerWidth);
    const [showContacts, setShowContacts] = React.useState(true);
    const [createRoom, setCreateRoom] = React.useState(false);
    const [filteredRooms, setFilteredRooms] = React.useState([]);
  
    function setDimension(e) {
      if (e.currentTarget.innerWidth > 1024) {
        setShowContacts(true);
      }
      setScreenSize(e.currentTarget.innerWidth);
    }
  
    let sdk = new MkdSDK();
  
    const handleClick = () => {
      inputRef.current.click();
    };
  
    const cancelFileUpload = () => {
      showPreviewModal(false);
      setFile(null);
      inputRef.current.value = "";
    };
  
    const formatDate = (time) => {
      let currentTime = moment(new Date());
      let messageDate = moment(time);
      if (currentTime.diff(messageDate, "days") > 1) {
        return moment(messageDate).format("Do MMMM");
      } else {
        return moment(messageDate).format("hh:mm A");
      }
    };
  
    const handleFileUpload = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      try {
        const upload = await sdk.uploadImage(formData);
        await sendImageAsMessage(upload);
      } catch (err) {
        console.log(err);
      }
    };
  
    async function handleKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
  
    async function getRooms(filter) {
      try {
        if (filter) {
          return setFilteredRooms(
            rooms.filter((user) =>
              `${renderName(user).toLowerCase()}`.includes(filter.toLowerCase())
            )
          );
        }
  
        const chats = await sdk.getMyRoom();
        if (chats && chats.list && chats.list[0]) {
          setRooms(chats.list);
          setFilteredRooms(chats.list);
          currentRooms.current = chats.list;
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
  
    async function createNewRoom(otherUser) {
      try {
        const createdRoom = await sdk.createRoom({
          user_id: state.user,
          other_user_id: otherUser.id,
        });
        let newRoom = {
          chat_id: createdRoom.chat_id,
          create_at: new Date(),
          email: otherUser.email,
          first_name: otherUser.first_name,
          id: createdRoom.room_id,
          last_name: otherUser.last_name,
          other_user_id: otherUser.id,
          other_user_update_at: new Date(),
          photo: otherUser.photo,
          unread: 0,
          update_at: new Date(),
          user_id: state.user,
          user_update_at: new Date(),
        };
  
        const updatedRoomList = [newRoom, ...rooms];
        setRooms(updatedRoomList);
        setFilteredRooms(updatedRoomList);
        currentRooms.current = updatedRoomList;
        setCreateRoom(false);
  
        if (document.getElementById(`user-${otherUser.id}`)) {
          document.getElementById(`user-${otherUser.id}`).click();
        } else {
          setTimeout(() => {
            document.querySelector(".container-chat").firstChild.click();
          }, 200);
        }
      } catch (err) {
        setCreateRoom(false);
        document.getElementById(`user-${otherUser.id}`).click();
      }
    }
  
    async function getChats(room_id, chat_id) {
      try {
        setRoomId(room_id);
        setChatId(chat_id);
        let date = new Date().toISOString().split("T")[0];
        const messages = await sdk.getChats(room_id, chat_id, date);
        if (messages && messages.model) {
          setMessages(messages.model.reverse());
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
  
    async function sendMessage() {
      try {
        let date = new Date().toISOString().split("T")[0];
        await sdk.postMessage({
          room_id: roomId,
          chat_id: chatId,
          user_id: state.user,
          message,
          date,
        });
        let newMessageObj = {
          message: message,
          user_id: state.user,
          is_image: false,
          timeStamp: new Date(),
        };
        const updatedMessages = [...messages, newMessageObj];
        setMessages(updatedMessages);
        setMessage("");
      } catch (err) {
        console.log("Error:", err);
      }
    }
  
    async function sendImageAsMessage(upload) {
      try {
        let date = new Date().toISOString().split("T")[0];
        await sdk.postMessage({
          room_id: roomId,
          chat_id: chatId,
          user_id: state.user,
          message: upload.url,
          date,
          is_image: true,
        });
        let newMessageObj = {
          message: upload.url,
          user_id: state.user,
          is_image: true,
          timeStamp: new Date(),
        };
        const updatedMessages = [...messages, newMessageObj];
        setMessages(updatedMessages);
        showPreviewModal(false);
        setFile(null);
        inputRef.current.value = "";
        setMessage("");
      } catch (err) {
        console.log("Error:", err);
      }
    }
  
    async function startPooling() {
      try {
        const pool = await sdk.startPooling(state.user);
        if (pool.message) {
          let newMessageObj = {
            message: pool.message,
            user_id: pool.user_id,
            is_image: false,
            timeStamp: new Date(),
          };
          if (pool.user_id === otherUserId.current) {
            setMessages((prevMessages) => [...prevMessages, newMessageObj]);
            setTimeout(async () => {
              await startPooling();
            }, 2000);
          } else {
            setTimeout(async () => {
              await startPooling();
            }, 1000);
          }
        } else {
          setTimeout(async () => {
            startPooling();
          }, 1000);
        }
      } catch (err) {
        console.log(err.message);
        tokenExpireError(dispatch, err.message);
        if (err.message === "TOKEN_EXPIRED")
          window.location.replace(`/${state.role}/login/`);
        else
          setTimeout(async () => {
            startPooling();
          }, 500);
      }
    }
  
    React.useEffect(() => {
      (async function () {
        await getRooms();
        await startPooling();
      })();
    }, []);
  
    React.useEffect(() => {
      window.addEventListener("resize", setDimension);
  
      return () => {
        window.removeEventListener("resize", setDimension);
      };
    }, [screenSize]);
  
    return (
      <div className="h-full w-full flex-1 pt-4">
        <div className="main-body container m-auto flex h-full w-11/12 flex-col">
          <div className="main flex flex-1 flex-col">
            <div className="heading flex-2 hidden lg:block">
              <h1 className="mb-4 text-3xl text-gray-700">Chat</h1>
            </div>
            <div className="flex h-full flex-1">
              {showContacts && (
                <>
                  <div className="flex justify-center">
                    <button
                      className="inline-block h-10 w-10 rounded-full bg-blue-400 text-white"
                      onClick={() => setCreateRoom(true)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex-2 w-full flex-col pr-6 lg:flex lg:w-1/3">
                    <div className="flex-2 px-2 pb-6">
                      <input
                        type="text"
                        className="block w-full border-b-2 border-gray-200 bg-transparent py-2 outline-none"
                        placeholder="Search"
                        onChange={(e) => getRooms(e.target.value)}
                      />
                    </div>
  
                    <div className="container-chat h-full max-h-[70vh] flex-1 overflow-y-auto overflow-x-hidden px-2">
                      {filteredRooms &&
                        filteredRooms.map((room, idx) => (
                          <div
                            key={idx}
                            id={`user-${room.other_user_id}`}
                            className="entry mb-4 flex transform cursor-pointer items-center rounded bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105"
                            onClick={() => {
                              getChats(room.id, room.chat_id);
                              otherUserId.current = room.other_user_id;
                              otherUserId.currentRoom = room;
                              if (screenSize < 1024) {
                                setShowContacts(false);
                              }
                            }}
                          >
                            <div className="flex-2">
                              <div className="relative h-12 w-12">
                                {room.photo ? (
                                  <img
                                    className="mx-auto h-12 w-12 rounded-full"
                                    src={room.photo}
                                    alt="user-photo"
                                  />
                                ) : (
                                  <UserCircleIcon className="h-10 w-10" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1 px-2">
                              <div className="w-32 truncate">
                                <span className="text-gray-800">
                                  {renderName(room)}
                                </span>
                              </div>
                            </div>
                            <div className="flex-2 text-right">
                              <div>
                                <small className="text-gray-500">
                                  {formatDate(room.update_at)}
                                </small>
                              </div>
                              {room.unread > 0 && (
                                <div>
                                  <small className="inline-block h-6 w-6 rounded-full bg-green-500 text-center text-xs leading-6 text-white">
                                    {room.unread}
                                  </small>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
  
              {screenSize > 1023 || (screenSize < 1024 && !showContacts) ? (
                <div className="flex max-h-[80vh] w-full flex-col lg:max-h-[60vh]">
                  {otherUserId?.current ? (
                    <div className="flex flex-1 flex-col">
                      <div className="flex-3">
                        <h2 className="mb-8 flex border-b-2 border-gray-200 py-1 text-xl">
                          <span
                            className="my-auto mr-4 lg:hidden"
                            onClick={() => setShowContacts(true)}
                          >
                            <ArrowLeftIcon className="h-6 w-6" />
                          </span>
                          Chatting with{" "}
                          <b className="ml-2">{`${renderName(
                            otherUserId.currentRoom
                          )}`}</b>
                        </h2>
                      </div>
  
                      {messages && (
                        <div className="max-h-[80vh] min-h-[60vh] flex-1 overflow-y-auto lg:max-h-[60vh]">
                          {messages.map((message, idx) => (
                            <div key={idx} className=" mb-4 flex">
                              {message?.user_id !== state.user && (
                                <div className="flex-2">
                                  <div className="relative h-12 w-12">
                                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-gray-400"></span>
                                  </div>
                                </div>
                              )}
                              <div
                                className={`flex-1 px-2 ${
                                  message?.user_id === state.user && "text-right"
                                }`}
                              >
                                <div className="inline-block">
                                  {message.is_image ? (
                                    <img
                                      src={message?.message}
                                      className="h-40 md:h-52 lg:h-80"
                                    />
                                  ) : (
                                    <p
                                      className={`${
                                        message?.user_id === state.user
                                          ? "bg-gray-300 text-gray-700 "
                                          : "bg-blue-600 text-white"
                                      } whitespace-pre-line rounded-xl p-2 px-6 `}
                                    >
                                      {message?.message}
                                    </p>
                                  )}
                                </div>
                                <div className="pl-4">
                                  <small className="text-gray-500">
                                    {moment(message.timestamp).format("hh:mm A")}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
  
                      <div className="flex-2 items-end pb-10 pt-4">
                        <div className="write flex rounded-lg bg-white shadow">
                          {/* <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                            <span className="block text-center text-gray-400 hover:text-gray-800">
                              <FaceSmileIcon className="h-6 w-6" />
                            </span>
                          </div> */}
  
                          <div className="flex-1">
                            {/* <textarea
                              name="message"
                              className="w-full block outline-none py-4 px-4 bg-transparent h-full max-"
                              rows="1"
                              placeholder="Type a message..."
                              autoFocus
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={handleKeyDown}
                            ></textarea> */}
                            <InputEmoji
                              value={message}
                              onChange={setMessage}
                              // cleanOnEnter
                              // onEnter={(e) => {}}
                              placeholder="Type a message"
                            />
                          </div>
                          <div className="flex-2 flex w-32 content-center items-center p-2">
                            <div className="flex-1 text-center">
                              <span className="text-gray-400 hover:text-gray-800">
                                <input
                                  className="hidden"
                                  ref={inputRef}
                                  type="file"
                                  accept="image/png, image/gif, image/jpeg"
                                  name="file"
                                  onChange={(e) => {
                                    setFile(e.target.files);
                                    showPreviewModal(true);
                                  }}
                                />
                                <button
                                  onClick={handleClick}
                                  className="inline-block align-text-bottom"
                                >
                                  <PaperClipIcon className="h-6 w-6 text-black" />
                                </button>
                              </span>
                            </div>
                            <div className="flex-1">
                              <button
                                className="inline-block h-10 w-10 rounded-full bg-blue-400"
                                onClick={() => sendMessage()}
                              >
                                <span className="inline-block align-text-bottom">
                                  <PaperAirplaneIcon className="h-6 w-6 text-white" />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[70vh] w-full items-center justify-center text-7xl text-gray-700 ">
                      Select a Chat to view
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {previewModal && file ? (
          <ImagePreviewModal
            file={file}
            handleFileUpload={handleFileUpload}
            cancelFileUpload={cancelFileUpload}
          />
        ) : null}
        {createRoom && (
          <CreateNewRoomModal
            roles={[...roles]}
            createNewRoom={createNewRoom}
            setCreateRoom={setCreateRoom}
          />
        )}
      </div>
    );
  };
  
  export default Chat;
  

