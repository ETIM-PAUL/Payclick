
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InteractiveButton } from "Components/InteractiveButton";
import { AuthContext } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";
import { LoginBg } from "Assets/images";

let sdk = new MkdSDK();

const AdminSignUpPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: GlobalDispatch } = React.useContext(GlobalContext);

  const [submitLoading, setSubmitLoading] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const redirect_uri = searchParams.get('redirect_uri')

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
    try {
      setSubmitLoading(true)
      const result = await sdk.register(data.email, data.password, "admin");
      if (!result.error) {
        dispatch({
          type: "LOGIN",
          payload: result,
        });
        showToast(GlobalDispatch, "Succesfully Registered", 4000, "success")
        navigate(redirect_uri ?? "/admin/dashboard");

      } else {
        setSubmitLoading(false)
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
      setSubmitLoading(false)
      console.log("Error", error);
      showToast(GlobalDispatch, error?.message, 4000, "error")
      setError("email", {
        type: "manual",
        message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
      });
    }
  };

  return (
    <div className="h-screen m-auto max-h-screen min-h-screen">
      <div className="min-h-full flex justify-center w-full max-h-full h-full">
        <section className="md:w-1/2 w-full flex flex-col items-center justify-center bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-md w-full px-6 mt-[9.375rem]">
            <h1
              className="md:font-bold font-semibold md:text-5xl text-3xl text-center mb-8">Register</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>

              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                {...register("email")}
                className={`resize-none border-2 p-2 px-4 bg-transparent mb-3 active:outline-none shadow appearance-none rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email?.message ? "border-red-500" : ""
                  }`}
              />
              <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password")}
                className={`border-2 focus:outline-none active:outline-none flex-grow p-2 px-4 shadow appearance-none rounded w-full py-2 text-gray-700 mb-3 leading-tight focus:shadow-outline ${errors.password?.message ? "border-red-500" : ""
                  }`}
              />
              <button type="button" className="absolute right-1 top-[20%]">
                <img
                  src="/invisible.png" alt=""
                  className="w-6 mr-2"
                />
              </button>
              <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
            </div>

            {/* <Link className={`self-end mb-6 font-semibold text-sm bg-clip-text bg-gradient-to-l from-[#33d4b7_9.11%] to-[#0d9895_69.45%] text-transparent`} to="/admin/forgot">Forgot Password</Link> */}

            <InteractiveButton
              type="submit"
              className={`flex justify-center items-center bg-gradient-to-l from-[#33d4b7_9.11%] to-[#0d9895_69.45%] text-white tracking-wide outline-none focus:outline-none rounded  py-2`}
              loading={submitLoading}
              disabled={submitLoading}
            >
              <span>Register</span>
            </InteractiveButton>
          </form>

          {/* <div className="text-center my-6 hr">OR</div> */}
          <div className="oauth flex flex-col gap-4 max-w-md w-full px-6 text-[#344054] grow">
            <div>
              <h3 className="mt-5 text-center text-sm text-gray-800 normal-case">Already have an account? <Link
                className="self-end mb-8 my-text-gradient font-semibold text-sm" to="/admin/login">Login </Link> </h3>
            </div>
          </div>
          {/* <div className={ `h-auto w-full` }></div> */}
          <p className="text-center text-gray-500 text-xs h-10 my-5">&copy; {new Date().getFullYear()} manaknightdigital inc. All rights reserved.</p>
        </section>
        <section className="md:block hidden w-1/2"
          style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: "cover", backgroundPosition: "center center" }}>
        </section>
      </div>


    </div>

  );
};

export default AdminSignUpPage;
