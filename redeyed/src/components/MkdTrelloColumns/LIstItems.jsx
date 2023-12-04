import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GlobalContext, showToast } from "Context/Global";
import { AuthContext, tokenExpireError } from "Context/Auth";
import MkdSDK from "Utils/MkdSDK";
import ListSetting from "./ListSetting";
import DropWrapper from "./DropWrapper";
import Item from "./Item";
import Col from "./Col";

const LIstItems = ({
  list,
  cardItems,
  getData,
  statuses,
  items,
  setItems,
  setCurrentTableData,
}) => {
  const [cardFormShow, setCardFormShow] = React.useState(false);
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

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

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i?.id !== item?.id)
        .concat({ ...item, status, icon: mapping?.icon });
      return [...newItems];
    });

    // console.log(item, status, monitor, "now");
    updateCardListId(item, status);
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const updateCardListId = async (item, status) => {
    console.log(item, status);
    let sdk = new MkdSDK();

    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/lists/${status}/cards/${item.id}`,
        { list_id: status },
        "PUT"
      );
      console.log(result);
      if (!result.error) {
        setCurrentTableData(() => []);
        getData();
      }
    } catch (error) {
      console.log("Error", error);
      tokenExpireError(dispatch, error.message);
    }
  };
  const onSubmit = async (_data) => {
    let sdk = new MkdSDK();
    console.log(_data);

    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/lists/${list.status}/cards`,
        {
          name: _data.name,
          start_date: new Date().toISOString().split("T")[0],
          due_date: new Date().toISOString().split("T")[0],
        },
        "POST"
      );
      if (!result.error) {
        showToast(globalDispatch, "Added");
        setCurrentTableData(() => []);
        getData();
        reset();
        setCardFormShow(!cardFormShow);
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

  return (
    <>
      <div className="mb-5 mr-4 inline-block rounded-[.3125rem] bg-neutral-100  p-5 text-neutral-700 shadow-lg dark:bg-green-200 dark:text-neutral-700 dark:shadow-black/30 ">
        <div className="mb-5 mt-0 flex items-center justify-between">
          <h2 className=" text-[20px] font-semibold  ">
            {list.title.toUpperCase()}{" "}
          </h2>

          <ListSetting
            setCardFormShow={setCardFormShow}
            cardFormSho={cardFormShow}
            list={list}
            getData={getData}
          />
        </div>
        <DropWrapper onDrop={onDrop} status={list.status}>
          <Col>
            {cardItems.map((i, idx) => (
              <Item
                key={idx}
                item={i}
                index={idx}
                moveItem={moveItem}
                list={list}
                getData={getData}
              />
            ))}
            {/* {items
              .filter((i) => i.status == s.status)
              .map((i, idx) => (
                <Item
                  key={idx}
                  item={i}
                  index={idx}
                  moveItem={moveItem}
                  status={s}
                />
              ))} */}
            {
              <>
                {!cardFormShow && (
                  <button
                    onClick={() => setCardFormShow(!cardFormShow)}
                    className=" flex items-center justify-start rounded-[5px] bg-transparent px-4 py-1 text-[16px] text-[#172b4d] hover:bg-[#aeaeae] "
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
                    Add a card
                  </button>
                )}

                {cardFormShow && (
                  <form
                    className=" w-full max-w-lg"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4 ">
                      <textarea
                        {...register("name")}
                        className={` w-full appearance-none rounded-[5px] border-none px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:outline-offset-0 ${
                          errors.name?.message ? "border-red-500" : ""
                        }`}
                        dir="auto"
                        placeholder="Enter a title for this card…"
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
                        onClick={() => setCardFormShow(!cardFormShow)}
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
                )}
              </>
            }
          </Col>
        </DropWrapper>
      </div>
    </>
  );
};

export default LIstItems;

          