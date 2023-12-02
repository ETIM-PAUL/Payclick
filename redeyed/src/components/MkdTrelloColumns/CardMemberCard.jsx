import { AuthContext } from "Src/authContext";
import { GlobalContext } from "Src/globalContext";
import MkdSDK from "Utils/MkdSDK";
import React from "react";

let sdk = new MkdSDK();

const CardMemberCard = ({ cardId, item, getCardUsers }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [cardMemberProfilePopup, setCardMemberProfilePopup] =
    React.useState(false);

  console.log(item);
  const removeMember = async () => {
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/cards/${cardId}/members/${item.user_id}/detach`,
        {},
        "DELETE"
      );
      console.log(result, "attachment  deleted");
      if (!result.error) {
        showToast(globalDispatch, "User Removed");
        getCardUsers();
        setCardMemberProfilePopup(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  return (
    <>
      <li className="">
        <p
          onClick={() => setCardMemberProfilePopup(true)}
          className=" mr-[3px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#DE350B] text-[16px] font-bold uppercase text-white shadow-[0_0_3px_0_#1111115e] hover:bg-[#b22b09] "
        >
          {item.first_name ? item.first_name.substring(0, 1) : "N"}
          {item.last_name ? item.last_name.substring(0, 1) : "/A"}
        </p>
      </li>
      {cardMemberProfilePopup && (
        <div className=" fixed  left-0 top-0 z-[999999999] h-full w-full">
          <div
            onClick={() => setCardMemberProfilePopup(false)}
            className=" absolute left-0 top-0 h-full w-full bg-[#0000004f] "
          />
          <div className="min-h-1/2 max-h-1/2 absolute  left-1/2 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white ">
            <div className=" ">
              <div className="flex items-center justify-between  bg-[#0079BF] px-7 py-6 text-white ">
                <h4 className="">
                  {" "}
                  {item.first_name
                    ? `${item.first_name} ${
    item.last_name ? item.last_name : ""
  }`
                    : "N/A"}
                  {}
                </h4>
                <button
                  className=" flex  h-[35px] w-[35px]  items-center  justify-center rounded-3xl border-none text-lg text-[#ffffff] hover:bg-[#00659f] "
                  onClick={() => setCardMemberProfilePopup(false)}
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
                <ul className="">
                  <li
                    onClick={removeMember}
                    className=" cursor-pointer px-7  py-2 text-[15px] font-normal text-[#172b4d] hover:bg-[#0001]"
                  >
                    Remove from card
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardMemberCard;

          