import { AuthContext } from "Src/authContext";
import { GlobalContext } from "Src/globalContext";
import MkdSDK from "Utils/MkdSDK";
import React from "react";
import { useParams } from "react-router";
import CardMemberCard from "./CardMemberCard";

let sdk = new MkdSDK();

const CardMember = ({ cardId }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [showForm, setShowForm] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [cardMembers, setCardMembers] = React.useState([]);

  const { workspaceId } = useParams();

  const getWorkspaceMember = async () => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/workspaces/${workspaceId}/members`,
        {},
        "GET"
      );
      console.log(result, "workspaces member");
      if (!result.error) {
        setUsers(result.list);
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  const getCardUsers = async () => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/members`,
        {},
        "GET"
      );
      console.log(result, "Cardmember result");
      //   setUsers(result);
      if (!result.error) {
        setCardMembers(result.list);
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  const assigneMember = async (id) => {
    console.log(id);

    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/members/${id}/attach`,
        {},
        "POST"
      );
      console.log(result, "Assinged result");
      if (!result.error) {
        showToast(globalDispatch, "User Added");
        getCardUsers();
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  console.log(users, cardMembers, "users");

  React.useEffect(() => {
    (async function () {
      await getWorkspaceMember();
    })();
    (async function () {
      await getCardUsers();
    })();
  }, []);

  return (
    <div>
      {cardMembers.length === 0 ? (
        <div
          onClick={() => setShowForm(true)}
          className=" relative mt-4 rounded-sm bg-[#c7c8d4] "
        >
          <p className=" cursor-pointer px-5 py-1 text-xl font-semibold capitalize ">
            add member
          </p>
        </div>
      ) : (
        <>
          <div className=" relative mb-1 mt-3 rounded-sm  bg-[#c7c8d400]">
            <p className=" flex items-center  py-1 text-xl font-semibold capitalize">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              Members
            </p>
          </div>
          <ul className="mt-2 flex flex-wrap ">
            {cardMembers?.map((item, i) => (
              <CardMemberCard
                cardId={cardId}
                item={item}
                getCardUsers={getCardUsers}
              />
            ))}
            <li className="">
              <p
                onClick={() => setShowForm(true)}
                className=" mr-[1px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#b1b1c8] text-[20px] font-bold uppercase text-white shadow-[0_0_3px_0_#1111115e] hover:bg-[#9e9ecf] "
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </p>
            </li>
          </ul>
        </>
      )}

      {showForm && (
        <div className=" fixed  left-0 top-0 z-[999999999] h-full w-full">
          <div
            onClick={() => setShowForm(false)}
            className=" absolute left-0 top-0 h-full w-full bg-[#0000004f] "
          />
          <div className="min-h-1/2 absolute left-1/2 top-1/2 max-h-[90vh] w-1/3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white px-7 py-6 ">
            <div className=" ">
              <div className=" mb-5  flex items-center justify-between ">
                <h4 className="">Members</h4>
                <button
                  className=" flex  h-[35px] w-[35px]  items-center  justify-center rounded-3xl border-none text-lg text-[#031d2c] hover:bg-[#dcdcdc] "
                  onClick={() => setShowForm(false)}
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
              <div className="">
                {users.map((item, i) => (
                  <div
                    key={i}
                    className="mb-3 flex cursor-pointer items-center rounded-md bg-[#eaf6ff] px-3 py-1 hover:bg-[#d3e3ff]  "
                    onClick={() => assigneMember(item.id)}
                  >
                    <p className=" mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#DE350B] text-[16px] font-bold uppercase text-white ">
                      {item.first_name ? item.first_name.substring(0, 1) : "N"}
                      {item.last_name ? item.last_name.substring(0, 1) : "/A"}
                    </p>
                    <h4 className="text-lg">
                      {" "}
                      {`${
                        item.first_name
                          ? `${item.first_name} ${
                              item.last_name ? item.last_name : "N/A"
                            }`
                          : "N/A"
                      }`}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMember;

          