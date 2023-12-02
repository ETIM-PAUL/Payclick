
  import React, {useState } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { Link } from "react-router-dom";
  import MkdSDK from "Utils/MkdSDK";
  import { tokenExpireError } from "Context/Auth";
  import { GlobalContext, showToast } from "Context/Global";
  import { InteractiveButton } from "Components/InteractiveButton";

const AdminForgotPage = () => {
  
    const [submitLoading, setSubmitLoading] = useState(false);

    const schema = yup
      .object({
        email: yup.string().email().required(),
      })
      .required();
  
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const { dispatch } = React.useContext(GlobalContext);
  
    const onSubmit = async (data) => {
      let sdk = new MkdSDK();
      try {
             setSubmitLoading(true)
        const result = await sdk.forgot(data.email);
  
        if (!result.error) {
          showToast(dispatch, "Reset Code Sent");
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
        setError("email", {
          type: "manual",
          message: error?.response?.data?.message?error?.response?.data?.message:error?.message,
        });
        tokenExpireError(dispatch, error?.response?.data?.message?error?.response?.data?.message:error?.message);
      }
      }
  
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors&&errors.email?.message ? "border-red-500" : ""}`}/>
              <p className="text-red-500 text-xs italic">
                {errors && errors.email?.message}
              </p>
            </div>
  
            <div className="flex items-center justify-between">
              <InteractiveButton
              className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              loading={submitLoading}
              disabled={submitLoading}
            >
            Forgot Password
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
}
  
  export default AdminForgotPage;
