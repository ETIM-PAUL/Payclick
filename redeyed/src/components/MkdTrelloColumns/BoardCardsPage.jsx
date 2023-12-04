import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import update from "react-addons-update";
import { GlobalContext, showToast } from "Src/globalContext";
import { AuthContext, tokenExpireError } from "Src/authContext";
import Lists from "./Lists";
import MkdSDK from "Utils/MkdSDK";

const BoardCardsPage = ({
  currentTableData,
  setCurrentTableData,
  // cardLIst,
  getData,
}) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [statuses, setStatuses] = React.useState(currentTableData);
  const [items, setItems] = React.useState([]);
  const [showItemsForm, setShowItemsForm] = React.useState(false);

  const schema = yup.object({
    name: yup.string().required("Title is required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();

  const onSubmit = async (_data) => {
    let sdk = new MkdSDK();
    console.log(_data);

    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/boards/${0}/lists`,
        {
          name: _data.name,
        },
        "POST"
      );
      if (!result.error) {
        showToast(globalDispatch, "Added");
        setCurrentTableData(() => []);
        getData();
        reset();
        setShowItemsForm(!showItemsForm);
      } else {
        if (result.validation) {
          const keys = Object.keys(result.validation);
          for (let i = 0; i < keys.length; i++) {
            const field = keys[i];
            setError(field, {
              type: "manual",
              message: result.validation[field],
            });
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
      setError("name", {
        type: "manual",
        message: error.message,
      });
      tokenExpireError(dispatch, error.message);
    }
  };

  const moveList = React.useCallback((dragIndex, hoverIndex) => {
    setCurrentTableData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="flex min-h-[400px] min-w-full max-w-full flex-wrap first:rounded-[5px_5px_0px_0px] ">
      {currentTableData?.length > 0 &&
        currentTableData?.map((list, i) => (
          <Lists
            list={list}
            key={i}
            // cardLIst={cardLIst}
            getData={getData}
            statuses={currentTableData}
            items={items}
            setItems={setItems}
            moveList={moveList}
            setCurrentTableData={setCurrentTableData}
            index={i}
            id={list.status}
          />
        ))}
      <div className="">
        <div
          className={`${
            showItemsForm
              ? "p-5"
              : "flex h-[3.25rem] items-center justify-center p-0"
          } mb-5 mr-4 inline-block rounded-[5px] bg-neutral-100  text-neutral-700 shadow-lg dark:bg-neutral-300 dark:text-neutral-700 dark:shadow-black/30  `}
        >
          <div className="w-[250px] first:rounded-[5px]">
            {showItemsForm ? (
              <form
                className=" w-full max-w-lg"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4 ">
                  <textarea
                    {...register("name")}
                    className={` w-full appearance-none rounded-[1px] border-none px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:outline-offset-0 ${
                      errors.name?.message ? "border-red-500" : ""
                    }`}
                    dir="auto"
                    placeholder="Enter a title for this List…"
                    data-autosize="true"
                    style={{
                      overflow: "hidden",
                      overflowWrap: "break-word",
                      resize: "none",
                      height: "54px",
                    }}
                    spellCheck="false"
                  ></textarea>
                  <p className="text-xs italic text-red-500">
                    {errors.name?.message}
                  </p>
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="focus:shadow-outline rounded bg-[#0079bf] px-[10px] py-[6px] text-[14px] font-bold text-white hover:bg-[#005d92] focus:outline-none"
                  >
                    Add Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowItemsForm(!showItemsForm)}
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
              </form>
            ) : (
              <button
                onClick={() => setShowItemsForm(!showItemsForm)}
                className=" my-0  flex h-[3.25rem]  w-full items-center justify-start rounded-[3px] bg-transparent px-4 py-1 text-[16px] text-[#172b4d] hover:bg-[#aeaeae] "
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                Add a List
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCardsPage;

          