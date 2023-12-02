
  import React, {useState} from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import MkdSDK from "Utils/MkdSDK";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { AuthContext, tokenExpireError } from "Context/Auth";
  import { showToast } from "Context/Global";
  
  const ClientResetPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const [submitLoading, setSubmitLoading] = useState(false);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
  
    const schema = yup
      .object({
        code: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      })
      .required();
  
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
        setSubmitLoading(true)
        const result = await sdk.reset(token, data.code, data.password);
        if (!result.error) {
          showToast(dispatch, "Password Reset");
          setTimeout(() => {
            navigate(`/client/login`);
          }, 2000);
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
        setSubmitLoading(false)
      } catch (error) {
        setSubmitLoading(false)
        console.log("Error", error);
        setError("code", {
          type: "manual",
          message: error?.response?.data?.message?error?.response?.data?.message:error?.message,
        });
        tokenExpireError(dispatch, error?.response?.data?.message?error?.response?.data?.message:error?.message);
      }
    };
  
    return (
      <>
        <div className="w-full max-w-xs mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="code"
              >
                Code
              </label>
              <input
                type="text"
                placeholder="Enter code sent to your email"
                {...register("code")}
                className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.code?.message ? "border-red-500" : ""
                }`}
              />
              <p className="text-red-500 text-xs italic">
                {errors.code?.message}
              </p>
            </div>
            <div className="mb-6">
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
                className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password?.message ? "border-red-500" : ""
                }`}
              />
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="******************"
                {...register("confirmPassword")}
                className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword?.message ? "border-red-500" : ""
                }`}
              />
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <InteractiveButton
              className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              loading={submitLoading}
              disabled={submitLoading}
            >
            Reset Password
            </InteractiveButton>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/admin/login"
              >
                Login?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} manaknightdigital inc. All rights
            reserved.
          </p>
        </div>
      </>
    );
  };
  
  export default ClientResetPage;
  
  
  