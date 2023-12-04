
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
import Logo from "../../../assets/logo.svg";

let sdk = new MkdSDK();

const ClientLoginPage = () => {
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
      const result = await sdk.login(data.email, data.password, "client");
      if (!result.error) {

        dispatch({
          type: "LOGIN",
          payload: result,
        });
        showToast(GlobalDispatch, "Succesfully Logged In", 4000, "success")
        navigate(redirect_uri ?? "/client/dashboard");

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
        } else {
          showToast(GlobalDispatch, result?.message, 4000, "error");
          setError("email", {
            type: "manual",
            message: result?.message,
          });
        }
      }
    } catch (error) {
      setSubmitLoading(false);
      showToast(GlobalDispatch, error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message, 4000, "error");
      console.log("Error", error);
      setError("email", {
        type: "manual",
        message: error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
      });
    }
  };

  const socialLogin = async (type) => {
    let role = "user";
    const result = await sdk.oauthLoginApi(type, role);
    window.open(result, "_self"); //  "sharer",  "toolbar=0,status=0,width=650,height=400,"
  };

  return (
    <div className="h-screen m-auto max-h-screen min-h-screen bg-white text-white">
      <div className="min-h-full flex justify-center w-full max-h-full h-full mt-">
        <section className="md:w-1/2 w-full flex flex-col my-24 items-center justify-center bg-black">
          <div className="max-w-lg w-full">
            <img
              src={Logo}
              className="md:font-bold font-semibold md:text-5xl text-3xl mx-auto mb-8"></img>

            <div className="oauth flex flex-col gap-10 px-6 mb-10 text-[#344054]">
              <button
                onClick={() => socialLogin("google")}
                className="border-2 p-4 flex justify-center gap-2 items-center">
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALpSURBVHgBtVbNTxNBFH8zuy3QoN0YJMEQs8QQP05LAsbEg4uRxMSD4AeaeLB6xEPhpIkm4MF4IsG/oODF4Edajgahy8UDxbAcjDEc2IORCIlUhVK6u/OcKbVpaZdWxN+lkzd9v9+b9968WQK7YEnXlYPSxm0GqCMQjZtUYScASUSw+NJwGU40GXOGFwfxIg7IqX6KGEYABSqCWBmKPc2TCbOiwEpXhwaMRAFQhb+Ei/i4aXpuyFNAkBMG8eqiLoVIG2N2Z5NhWiUCyxfPqLLtznuTYxKQWIRk869wT60SuYD8ZyHZrGzk3NGkCP3r6Cy0GGYyH5CuqRL1DXKhkBd5/gRrfa0h+7MSKQ0aRhqnEwOwC1YvtOuO41jlyPMCzpRvKT3boKbeNRdsYOzw1FwP/COoPSnriKjWdKxCsO8j0GAmm0/HdQZgHyADhXM8FdtqnPzArUVIv280gsOWVc5BH9xUoWrUJkWRi7pBiAQufRmF4fIukt+N8Hh0qAYsNUoBSztHRtmCfQASVCn8Z1BCiLXT6DJbg32CzPhFKpwXv9AHkY3jOoA5Uc6B53+Mn90o2SBi0mKo2MS5RZvyVVwYFp0g3P95GpbdQNJJuy3mnVgSqsT5JxuRnQKMQYj6uhyDr5Pjm8fg3o+zsMwCQlqR66RIteT6082S6LNw7BlJ/EpX22ufp1r1DEiF2yeOXDupfH396W0lcopMZKCoG/llNYzB4LN8+tvHr8zz3JYUl48MPkHJ0OyNN2NFxJFuZb1W7pfSp8J1K3cV6jQU+aHk1+IP/At5Ae3FTVWm9ny5e5FT4uMasi8WL7RKcs+nALUboO5bGKStozl2GJl+VD+w7VaAjpfXNRTHxb09OP61Hqj53m3GH9a35cUL/5DofWU6zNfGI7RgD9g6FI1hxu4stJV99LVotyJnaJjXZAiqAPI6Aa/Thx118hTIC/G6UMjolJLL2Y+AXBMgr4coPmc2CMVYojc648XxG0ZrPRAMMnAhAAAAAElFTkSuQmCC"} className="w-[18px] h-[18px]" />
                <span>Sign in With Google</span>
              </button>


              <button
                onClick={() => socialLogin("apple")}
                className="border-2 p-4 flex justify-center gap-2 items-center">
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgBrZSLDYIwEIZ/nYAN7AayQdkAN5ANHEE3YQR0AtxANygbECfQu3DEQqo8rn/yJaQXvj6uKbA8B6ImSkTIhXgLJyhTeDLGQJkHIq4OImqnZJvAWEFYdFt6EjfiTqREQmTEXr4bqV9DchY4DM+px/2pMbVMMEs2l6MvLGPKOK1CVo5lmXJ11pdtoc8rtnA3FjbQJQ0NaprC/5qxsIauMY7IfWGuFPYksbYdvI+FUmgQSLVSdsaP8Bm4hbIKEzH4PhZOZrfoLrCVGo+3Uhs04gNeaNb9s/xcIAAAAABJRU5ErkJggg=="} className="w-[16px] h-[16px]" />
                <span>Sign in With Apple</span>
              </button>

            </div>
          </div>

          <hr className=" bg-black h-1 w-[80%]" />

          <div className="text-center my-6 hr font-bold text-lg">or, download the App</div>

          <div className="oauth flex gap-10 max-w-md w-full px-6 mb-10 text-[#344054]">
            <button
              onClick={() => socialLogin("apple")}
              className="border-2 p-4 flex font-bold justify-center gap-2 items-center">
              <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgBrZSLDYIwEIZ/nYAN7AayQdkAN5ANHEE3YQR0AtxANygbECfQu3DEQqo8rn/yJaQXvj6uKbA8B6ImSkTIhXgLJyhTeDLGQJkHIq4OImqnZJvAWEFYdFt6EjfiTqREQmTEXr4bqV9DchY4DM+px/2pMbVMMEs2l6MvLGPKOK1CVo5lmXJ11pdtoc8rtnA3FjbQJQ0NaprC/5qxsIauMY7IfWGuFPYksbYdvI+FUmgQSLVSdsaP8Bm4hbIKEzH4PhZOZrfoLrCVGo+3Uhs04gNeaNb9s/xcIAAAAABJRU5ErkJggg=="} className="w-[24px] h-[24px]" />
              <span>Download on the Appstore</span>
            </button>
            <button
              onClick={() => socialLogin("google")}
              className="border-2 p-4 flex font-bold justify-center gap-2 items-center">
              <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALpSURBVHgBtVbNTxNBFH8zuy3QoN0YJMEQs8QQP05LAsbEg4uRxMSD4AeaeLB6xEPhpIkm4MF4IsG/oODF4Edajgahy8UDxbAcjDEc2IORCIlUhVK6u/OcKbVpaZdWxN+lkzd9v9+b9968WQK7YEnXlYPSxm0GqCMQjZtUYScASUSw+NJwGU40GXOGFwfxIg7IqX6KGEYABSqCWBmKPc2TCbOiwEpXhwaMRAFQhb+Ei/i4aXpuyFNAkBMG8eqiLoVIG2N2Z5NhWiUCyxfPqLLtznuTYxKQWIRk869wT60SuYD8ZyHZrGzk3NGkCP3r6Cy0GGYyH5CuqRL1DXKhkBd5/gRrfa0h+7MSKQ0aRhqnEwOwC1YvtOuO41jlyPMCzpRvKT3boKbeNRdsYOzw1FwP/COoPSnriKjWdKxCsO8j0GAmm0/HdQZgHyADhXM8FdtqnPzArUVIv280gsOWVc5BH9xUoWrUJkWRi7pBiAQufRmF4fIukt+N8Hh0qAYsNUoBSztHRtmCfQASVCn8Z1BCiLXT6DJbg32CzPhFKpwXv9AHkY3jOoA5Uc6B53+Mn90o2SBi0mKo2MS5RZvyVVwYFp0g3P95GpbdQNJJuy3mnVgSqsT5JxuRnQKMQYj6uhyDr5Pjm8fg3o+zsMwCQlqR66RIteT6082S6LNw7BlJ/EpX22ufp1r1DEiF2yeOXDupfH396W0lcopMZKCoG/llNYzB4LN8+tvHr8zz3JYUl48MPkHJ0OyNN2NFxJFuZb1W7pfSp8J1K3cV6jQU+aHk1+IP/At5Ae3FTVWm9ny5e5FT4uMasi8WL7RKcs+nALUboO5bGKStozl2GJl+VD+w7VaAjpfXNRTHxb09OP61Hqj53m3GH9a35cUL/5DofWU6zNfGI7RgD9g6FI1hxu4stJV99LVotyJnaJjXZAiqAPI6Aa/Thx118hTIC/G6UMjolJLL2Y+AXBMgr4coPmc2CMVYojc648XxG0ZrPRAMMnAhAAAAAElFTkSuQmCC"} className="w-[24px] h-[24px]" />
              <span>GET IT ON Google Play</span>
            </button>



          </div>
        </section>

        {/* <section className="md:block hidden w-1/2"
          style={ {  backgroundImage: `url(${LoginBg})`, backgroundSize: "cover", backgroundPosition: "center center" } }>
        </section> */}
      </div>


    </div>

  );
};

export default ClientLoginPage;
