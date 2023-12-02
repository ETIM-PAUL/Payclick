
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { GlobalContext, showToast } from "Context/Global";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, tokenExpireError } from "Context/Auth";

let sdk = new MkdSDK();

const EditAdminEmailPage = () => {
  const schema = yup
    .object({
      subject: yup.string().required(),
      html: yup.string().required(),
      tag: yup.string().required(),
    })
    .required();
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [slug, setSlug] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const params = useParams();

  useEffect(function () {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "email",
      },
    });

    (async function () {
      try {
        sdk.setTable("email");
        const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
        if (!result.error) {
          setValue("subject", result.model.subject);
          setValue("html", result.model.html);
          setValue("tag", result.model.tag);
          setSlug(result.model.slug);
          setId(result.model.id);
        }
      } catch (error) {
        console.log("error", error);
        tokenExpireError(dispatch, error.message);
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await sdk.callRestAPI(
        { id, slug, subject: data.subject, html: data.html, tag: data.tag },
        "PUT"
      );

      if (!result.error) {
        showToast(globalDispatch, "Updated");
        navigate("/admin/email");
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
      setError("html", {
        type: "manual",
        message: error.message,
      });
      tokenExpireError(dispatch, error.message);
    }
  };

  return (
    <div className=" shadow-md rounded   mx-auto p-5">
      <h4 className="text-2xl font-medium">Edit Email</h4>
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
            value={slug}
            readOnly
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline}`}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
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

export default EditAdminEmailPage;
