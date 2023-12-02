
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, tokenExpireError } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";

let sdk = new MkdSDK();

const EditAdminUserPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string(),
      role: yup.string(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const params = useParams();
  const [oldEmail, setOldEmail] = useState("");
  const [id, setId] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectRole = [
    "client",
"admin",
"public",
  ];
  
  const selectStatus = [
    { key: "0", value: "Inactive" },
    { key: "2", value: "Suspend" },
    { key: "1", value: "Active" },
  ];

  const onSubmit = async (data) => {
    try {
      if (oldEmail !== data.email) {
        const emailresult = await sdk.updateEmailByAdmin(data.email, id);
        if (!emailresult.error) {
          showToast(globalDispatch, "Email Updated", 1000);
        } else {
          if (emailresult.validation) {
            const keys = Object.keys(emailresult.validation);
            for (let i = 0; i < keys.length; i++) {
              const field = keys[i];
              setError(field, {
                type: "manual",
                message: emailresult.validation[field],
              });
            }
          }
        }
      }

      if (data.password.length > 0) {
        const passwordresult = await sdk.updatePasswordByAdmin(
          data.password,
          id
        );
        if (!passwordresult.error) {
          showToast(globalDispatch, "Password Updated", 2000);
        } else {
          if (passwordresult.validation) {
            const keys = Object.keys(passwordresult.validation);
            for (let i = 0; i < keys.length; i++) {
              const field = keys[i];
              setError(field, {
                type: "manual",
                message: passwordresult.validation[field],
              });
            }
          }
        }
      }

      sdk.setTable("user");

      const result = await sdk.callRestAPI(
        { id, email: data.email, role: data.role, status: data.status },
        "PUT"
      );

      if (!result.error) {
        showToast(globalDispatch, "Added", 4000);
        navigate("/admin/users");
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
      setError("email", {
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
        path: "users",
      },
    });

    (async function () {
      try {
        sdk.setTable("user");
        const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");

        if (!result.error) {
          setValue("email", result.model.email);
          setValue("role", result.model.role);
          setValue("status", result.model.status);
          setOldEmail(result.model.email);
          setId(result.model.id);
        }
      } catch (error) {
        console.log("Error", error);
        tokenExpireError(dispatch, error.message);
      }
    })();
  }, []);
  return (
    <div className=" shadow-md rounded   mx-auto p-5">
      <h4 className="text-2xl font-medium">Edit User</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email?.message ? "border-red-500" : ""}`}/>
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("role")}
          >
            {selectRole.map((option) => (
              <option name="role" value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("status")}
          >
            {selectStatus.map((option) => (
              <option name="status" value={option.key} key={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password?.message ? "border-red-500" : ""}`}/>
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
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

export default EditAdminUserPage;
