
  import React from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import MkdSDK from "Utils/MkdSDK";
  import { useNavigate } from "react-router-dom";
  import { GlobalContext, showToast } from "Context/Global";
  import { tokenExpireError } from "Context/Auth";
  import {DynamicContentType} from "Components/DynamicContentType";
  
const AddAdminCmsPage = () => {
  const schema = yup
    .object({
      page: yup.string().required(),
      key: yup.string().required(),
      type: yup.string().required(),
      value: yup.string(),
    })
    .required();

  const selectType = [
    { key: "text", value: "Text" },
    { key: "image", value: "Image" },
    { key: "number", value: "Number" },
    { key: "kvp", value: "Key-Value Pair" },
    { key: "image-list", value: "Image List" },
    { key: "captioned-image-list", value: "Captioned Image List" },
    { key: "team-list", value: "Team List" },
  ];

  const { dispatch } = React.useContext(GlobalContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const [contentType, setContentType] = React.useState(selectType[0]?.key);
  const [contentValue, setContentValue] = React.useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    console.log(data);
    try {
      sdk.setTable("cms");

      const result = await sdk.cmsAdd(
        data.page,
        data.key,
        data.type,
        contentValue
      );
      if (!result.error) {
        navigate("/admin/cms");
        showToast(globalDispatch, "Added");
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
      setError("page", {
        type: "manual",
        message: error.message,
      });
      tokenExpireError(dispatch, error.message);
    }
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "cms",
      },
    });
  }, []);

  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">Add CMS Content</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="page"
          >
            Page
          </label>
          <input
            type="text"
            placeholder="Page"
            {...register("page")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline}`}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="key"
          >
            Content Identifier
          </label>
          <input
            type="text"
            placeholder="Content Identifier"
            {...register("key")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.key?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.key?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content Type
          </label>
          <select
            name="type"
            id="type"
            className="shadow border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("type", {onChange:  e => setContentType(e.target.value) } ) }
          >
            {selectType.map((option) => (
              <option name={option.name} value={option.key} key={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <DynamicContentType contentType={contentType} setContentValue={setContentValue} />
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAdminCmsPage;
