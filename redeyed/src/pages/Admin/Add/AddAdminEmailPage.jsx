
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "Context/Global";
import { tokenExpireError } from "Context/Auth";
const AddAdminEmailPage = () => {
  const schema = yup
    .object({
      slug: yup.string().required(),
      subject: yup.string().required(),
      html: yup.string().required(),
      tag: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(GlobalContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

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

    try {
      sdk.setTable("email");

      const result = await sdk.callRestAPI(
        {
          slug: data.slug,
          subject: data.subject,
          html: data.html,
          tag: data.tag,
        },
        "POST"
      );
      if (!result.error) {
        navigate("/admin/email");
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
      setError("subject", {
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
        path: "email",
      },
    });
  }, []);

  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">Add Email</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="slug"
          >
            Email Type
          </label>
          <input
            type="text"
            placeholder="Email Type"
            {...register("slug")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline}`}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            placeholder="subject"
            {...register("subject")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.subject?.message ? "border-red-500" : ""}`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.subject?.message}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tag"
          >
            Tags
          </label>
          <input
            type="text"
            placeholder="tag"
            {...register("tag")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tag?.message ? "border-red-500" : ""}`}
          />
          <p className="text-red-500 text-xs italic">{errors.tag?.message}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="html"
          >
            Email Body
          </label>
          <textarea
            placeholder="Email Body"
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.html?.message ? "border-red-500" : ""}`}
            {...register("html")}
            rows={15}
          ></textarea>
          <p className="text-red-500 text-xs italic">{errors.html?.message}</p>
        </div>
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

export default AddAdminEmailPage;
