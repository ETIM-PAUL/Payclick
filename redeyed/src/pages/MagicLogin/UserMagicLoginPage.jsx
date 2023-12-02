
import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";

const UserMagicLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch:GlobalDispatch } = React.useContext(GlobalContext);

  const [attemptingLogin, setAttemptingLogin] = React.useState(false)

  const params = useParams();

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
      setAttemptingLogin(true)
      const result = await sdk.magicLoginAttempt(data.email, params?.role);
      
      if (!result.error) {
        setAttemptingLogin(false)
        console.log(result);
        showToast(GlobalDispatch, 'Please check your mail to complete login attempt')

        // dispatch({
          //   type: "LOGIN",
          //   payload: result,
          // });
          // navigate("/user/dashboard");
        }
        
        
      } catch (error) {
      setAttemptingLogin(false)
      console.log("Error", error);
      setError("email", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

       
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {attemptingLogin ? 'Attempting Log In...' : 'Sign In'} </button>
          
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} manaknightdigital inc. All rights
        reserved.
      </p>
    </div>
  );
};

export default UserMagicLoginPage;
