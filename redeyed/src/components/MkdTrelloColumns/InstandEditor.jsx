import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { AuthContext} from "Context/Auth";

const InstandEditor = ({ setShowInstandEditor, item, list, getData }) => {
  const {dispatch} = useContext(AuthContext);

  const schema = yup.object({
    name: yup.string().required("Title is required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(item, list);

  const onSubmit = async (_data) => {
    let sdk = new MkdSDK();
    console.log(_data);
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/lists/${list.status}/cards/${item.id}`,
        { name: _data.name },
        "PUT"
      );
      console.log(result);
      if (!result.error) {
        getData();
        setShowInstandEditor(false);
      }
    } catch (error) {
      console.log("Error", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  React.useEffect(() => {
    setValue("name", item.content);
  }, []);

  return (
    <div className=" ">
      <div
        onClick={() => setShowInstandEditor(false)}
        className="fixed left-0 top-0 z-[99999] h-full w-full bg-[#11111169]"
      ></div>
      <form
        className="fixed left-[50%] top-[50%] z-[9999999] -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-100 p-6 text-neutral-700 shadow-lg dark:bg-neutral-300 dark:text-neutral-700 dark:shadow-black/30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 ">
          <textarea
            {...register("name")}
            className={`w-full appearance-none rounded-md border-none px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:outline-offset-0 ${
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
          <p className="text-xs italic text-red-500">{errors.name?.message}</p>
        </div>

        <div className="flex ">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-[#0079bf] px-[10px] py-[6px] text-[14px] font-bold text-white hover:bg-[#005d92] focus:outline-none"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowInstandEditor(false)}
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
    </div>
  );
};

export default InstandEditor;

          