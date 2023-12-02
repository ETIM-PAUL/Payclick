import React from "react";
import { useParams } from "react-router";
import AlartMolad from "./AlartMolad";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";

const ListSetting = ({ cardFormShow, setCardFormShow, list, getData }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [showModal, setShowModal] = React.useState(false);
  const [showMoveListModal, setShowMoveListModal] = React.useState(false);
  const [showNameChangeModal, setShowNameChangeModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showArchiveModal, setShowArchiveModal] = React.useState(false);
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const [listName, setListName] = React.useState(list.title);

  const { id } = useParams();

  async function getLists() {
    let sdk = new MkdSDK();
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/boards/${id}/lists?order_by=id&direction=asc`,
        {},
        "GET"
      );

      const { list } = result;
      setCurrentTableData(list);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  const updateListPosition = async (listId) => {
    let sdk = new MkdSDK();
    console.log(listId);
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/boards/${id}/lists/${list.status}`,
        {
          position: listId,
        },
        "PUT"
      );
      console.log(result);
      if (!result.error) {
        getData();
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };
  const updateListName = async () => {
    let sdk = new MkdSDK();
    if (listName) {
      try {
        const result = await sdk.callRawAPI(
          `/v2/api/lambda/pm/boards/${id}/lists/${list.status}`,
          {
            name: listName,
          },
          "PUT"
        );
        console.log(result);
        if (!result.error) {
          getData();
          setShowNameChangeModal(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        tokenExpireError(dispatch, error.message);
      }
    } else {
      showToast(globalDispatch, "Enter Name");
    }
  };

  const deleteList = async () => {
    let sdk = new MkdSDK();
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/lists/${list.status}`,
        {},
        "DELETE"
      );
      console.log(result);
      if (!result.error) {
        getData();
        setShowDeleteModal(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };
  const archiveList = async () => {
    let sdk = new MkdSDK();
    if (listName) {
      try {
        const result = await sdk.callRawAPI(
          `/v2/api/lambda/pm/lists/${list.status}`,
          {
            archive: true,
          },
          "DELETE"
        );
        console.log(result);
        if (!result.error) {
          getData();
          setShowArchiveModal(false);
          setShowModal(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        tokenExpireError(dispatch, error.message);
      }
    } else {
      showToast(globalDispatch, "Enter Name");
    }
  };

  React.useEffect(() => {
    (async function () {
      await getLists();
    })();
  }, []);

  // console.log(s, "s");

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-[4px] px-1 py-1 hover:bg-[#d6eaff]  hover:shadow-[0_0_3px_1px_#1111115e] "
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
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>
      {showModal && (
        <div className=" fixed  left-0 top-0 z-[9999] h-full w-full">
          <div
            onClick={() => setShowModal(false)}
            className=" absolute left-0 top-0 h-full w-full bg-[#0000004f] "
          />
          <div className="min-h-1/2 max-h-1/2 absolute  left-1/2 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white ">
            <h5 className=" relative border-b border-[#5e6c84] py-2 text-center text-[#5e6c84] ">
              List actions
              <button
                className=" absolute  right-0 top-0  flex  h-[35px] w-[35px] items-center justify-center rounded-3xl border-none text-lg text-[#031d2c] hover:bg-[#dcdcdc]"
                onClick={() => setShowModal(false)}
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
            </h5>
            <ul className="">
              <li
                onClick={() => {
                  setCardFormShow(!cardFormShow);
                  setShowModal(false);
                }}
                className=" cursor-pointer px-[12px] py-[6px] text-[#172b4d] hover:bg-[#ceecfc5d] "
              >
                Add Card...
              </li>
              <li
                onClick={() => {
                  setShowMoveListModal(true);
                  //   setShowModal(false);
                }}
                className=" cursor-pointer px-[12px] py-[6px] text-[#172b4d] hover:bg-[#ceecfc5d] "
              >
                Move List...
              </li>
              <li
                onClick={() => {
                  setShowNameChangeModal(true);
                  //   setShowModal(false);
                }}
                className=" cursor-pointer px-[12px] py-[6px] text-[#172b4d] hover:bg-[#ceecfc5d] "
              >
                Change Name
              </li>
              <li
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                className=" cursor-pointer px-[12px] py-[6px] text-[#172b4d] hover:bg-[#ceecfc5d] "
              >
                Delete
              </li>
              <li
                onClick={() => {
                  setShowArchiveModal(true);
                }}
                className=" cursor-pointer px-[12px] py-[6px] text-[#172b4d] hover:bg-[#ceecfc5d] "
              >
                Archive
              </li>
            </ul>
          </div>
        </div>
      )}
      {showMoveListModal && (
        <div className=" fixed  left-0 top-0 z-[999999999] h-full w-full">
          <div
            onClick={() => setShowMoveListModal(false)}
            className=" absolute left-0 top-0 h-full w-full bg-[#0000004f] "
          />
          <div className="min-h-1/2 max-h-1/2 absolute  left-1/2 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white ">
            <h5 className=" relative border-b border-[#5e6c84] py-2 text-center text-[#5e6c84] ">
              Move
              <button
                className=" absolute  right-0 top-0  flex  h-[35px] w-[35px] items-center justify-center rounded-3xl border-none text-lg text-[#031d2c] hover:bg-[#dcdcdc]"
                onClick={() => setShowMoveListModal(false)}
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
            </h5>
            <div className="px-5 py-5">
              <label
                className="w-full rounded-[1px] py-3 pb-3 font-medium leading-tight text-gray-700 focus:outline-none focus:outline-offset-0 "
                htmlFor=""
              >
                Position
              </label>
              <select
                defaultValue={list.position}
                className=" w-full appearance-none rounded-[3px] border-none bg-[#f2f2f2] px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:outline-offset-0 "
                onChange={(e) => updateListPosition(e.target.value)}
              >
                {currentTableData.length > 0 &&
                  currentTableData.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.id} {list.position === item.id && "Current"}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}
      {showNameChangeModal && (
        <div className=" fixed  left-0 top-0 z-[99999] h-full w-full">
          <div
            onClick={() => setShowNameChangeModal(false)}
            className=" absolute left-0 top-0 h-full w-full bg-[#0000004f] "
          />
          <div className="min-h-1/2 max-h-1/2 absolute  left-1/2 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white ">
            <h5 className=" relative border-b border-[#5e6c84] py-2 text-center text-[#5e6c84] ">
              Change Name
              <button
                className=" absolute  right-0 top-0  flex  h-[35px] w-[35px] items-center justify-center rounded-3xl border-none text-lg text-[#031d2c] hover:bg-[#dcdcdc]"
                onClick={() => setShowNameChangeModal(false)}
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
            </h5>
            <div className="px-5 py-5">
              <div className=" w-full max-w-lg">
                <div className="mb-4 ">
                  <textarea
                    className={` w-full appearance-none rounded-[1px] border-none px-3 py-2 leading-tight text-gray-700 focus:outline-none   `}
                    dir="auto"
                    placeholder="Enter a title for this List…"
                    // data-autosize="true"
                    style={{
                      overflow: "hidden",
                      overflowWrap: "break-word",
                      resize: "none",
                      height: "54px",
                    }}
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex">
                  <button
                    onClick={updateListName}
                    className="focus:shadow-outline rounded bg-[#0079bf] px-[10px] py-[6px] text-[14px] font-bold text-white hover:bg-[#005d92] focus:outline-none"
                  >
                    Save
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => setShowMoveListModal(false)}
                    className=" ml-2 bg-transparent hover:bg-[#aeaeae] text-[#172b4d] flex justify-start items-center text-[16px] py-1 px-4 rounded-[3px] "
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
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <AlartMolad
          onClose={setShowDeleteModal}
          onClick={deleteList}
          text="Are you want to delete"
        />
      )}
      {showArchiveModal && (
        <AlartMolad
          onClose={setShowArchiveModal}
          onClick={archiveList}
          text="Are you want to Archive"
        />
      )}
    </>
  );
};

export default ListSetting;

          