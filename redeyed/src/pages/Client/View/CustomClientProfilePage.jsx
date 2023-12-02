
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { GlobalContext, showToast } from "Context/Global";
import { tokenExpireError, AuthContext } from "Context/Auth";
import { InteractiveButton } from "Components/InteractiveButton";
import { ClientTopNav } from "Components/ClientHeader";
import { PlayCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import VideoThumbnail from "react-video-thumbnail";
import { Link } from "react-router-dom";
import { PreStripeModal } from "Components/PreStripeModal/PreStripeModal";
import { StripeModal } from "Components/StripeModal/StripeModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PrePaypalModal from "Components/PrePaypalModal/PrePaypalModal";
import { PaypalModal } from "Components/PaypalModal";

let sdk = new MkdSDK();

const ClientProfilePage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  const { dispatch } = React.useContext(GlobalContext);
  const [oldEmail, setOldEmail] = useState("");
  const [fileObj, setFileObj] = React.useState({});

  const [oldPhoto, setOldPhoto] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [preStripeModal, setPreStripeModal] = useState(false);
  const [stripeModal, setStripeModal] = useState(false);
  const [amount, setAmount] = useState();
  const [prePaypalModal, setPrePaypalModal] = useState(false);
  const [paypalModal, setPaypalModal] = useState(false);
  const [coinExchange, setCoinExchange] = useState();
  const [clientSecret, setClientSecret] = useState("pi_1Gt0RG2eZvKYlo2CtxkQK2rm_secret_NwTJsElj83lkl9ZDjSIHPdtDB");
  const [paymentIntent, setPaymentIntent] = useState("");
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const previewImage = (field, target, multiple = false) => {
    let tempFileObj = fileObj;
    console.log(target);
    if (multiple) {
      if (tempFileObj[field]) {
        tempFileObj[field] = [
          ...tempFileObj[field],
          {
            file: target.files[0],
            tempFile: {
              url: URL.createObjectURL(target.files[0]),
              name: target.files[0].name,
              type: target.files[0].type,
            },
          },
        ];
      } else {
        tempFileObj[field] = [
          {
            file: target.files[0],
            tempFile: {
              url: URL.createObjectURL(target.files[0]),
              name: target.files[0].name,
              type: target.files[0].type,
            },
          },
        ];
      }
    } else {
      tempFileObj[field] = {
        file: target.files[0],
        tempURL: URL.createObjectURL(target.files[0]),
      };
    }
    setFileObj({ ...tempFileObj });
  };

  async function fetchData() {
    try {
      const result = await sdk.getProfile();
      console.log("fetch profile result");
      console.log(result);
      setValue("email", result?.email);
      setValue("first_name", result?.first_name);
      setValue("last_name", result?.last_name);
      setOldEmail(result?.email);
      setOldPhoto(result?.photo);
    } catch (error) {
      console.log("Error", error);
      tokenExpireError(
        dispatch,
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }

  const handleImageChange = async (e) => {
    console.log("starting image change");
    const formData = new FormData();
    console.log(e[0]);
    formData.append("file", e[0]);
    try {
      const result = await sdk.uploadImage(formData);
      console.log("photo result");
      console.log(result.url);
      setUploadedPhoto(result.url);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    console.log("submitted data");
    console.log(data);
    try {
      setSubmitLoading(true);
      if (fileObj && fileObj["photo"] && fileObj["photo"]?.file) {
        let formData = new FormData();
        formData.append("file", fileObj["photo"]?.file);
        let uploadResult = await sdk.uploadImage(formData);
        data["photo"] = uploadResult.url;
        showToast(dispatch, "Profile Photo Updated", 1000);
      }
      // return console.log("data", data);

      const result = await sdk.updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        photo: data.photo,
      });

      if (!result.error) {
        showToast(dispatch, "Profile Updated", 4000);
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
      if (oldEmail !== data.email) {
        const emailresult = await sdk.updateEmail(data.email);
        if (!emailresult.error) {
          showToast(dispatch, "Email Updated", 1000);
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
        const passwordresult = await sdk.updatePassword(data.password);
        if (!passwordresult.error) {
          showToast(dispatch, "Password Updated", 2000);
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
      await fetchData();
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      console.log("Error", error);
      setError("email", {
        type: "manual",
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
      tokenExpireError(
        dispatch,
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // useEffect(() => {
  //   const getPaymentIntent = async () => {
  //       const productDetails = {
  //           amount: surv?.[0]?.price * 100,
  //           quiz_type: returnQuiz(surv?.[0]?.survey_name),
  //           currency: "USD",
  //           company: "0",
  //           users_count: 1,
  //       };
  //       try {
  //           if (localStorage.getItem("token")) {
  //               const result = await sdk.createPaymentIntent(
  //                   productDetails
  //               );
  //               if (!result.error) {
  //                   setClientSecret(result.client_secret);
  //                   setPaymentIntent(result.payment_intent_id);
  //               } else if (result.error) {
  //                   setTimeout(() => {
  //                       // navigate("/");
  //                       showToast(dispatch, "Please Try Again, Later");
  //                   }, 2000);
  //               }
  //           } else {
  //               const result = await sdk.createPaymentIntentPublic(
  //                   productDetails
  //               );
  //               if (!result.error) {
  //                   setClientSecret(result.client_secret);
  //                   setPaymentIntent(result.payment_intent_id);
  //               } else if (result.error) {
  //                   setTimeout(() => {
  //                       // navigate("/");
  //                       showToast(dispatch, "Please Try Again, Later");
  //                   }, 2000);
  //               }
  //           }
  //       } catch (error) {
  //           setTimeout(() => {
  //               // navigate("/");
  //               showToast(dispatch, "Please Try Again, Later");
  //           }, 1000);
  //           // tokenExpireError(dispatch, error.message);
  //       }
  //   };
  //   if (proceed) {
  //     getPaymentIntent()
  //   }
  // }, [proceed]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };



  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "profile",
      },
    });

    // fetchData();
  }, []);

  return (
    <>
      <main>
        {/* <div className="rounded bg-white p-5 shadow  ">
          <h4 className="text-2xl font-medium">Edit Profile</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
            <div className="relative mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                for="photo"
              >
                Upload A Photo{" "}
                {oldPhoto || fileObj["photo"]?.tempURL ? (
                  <span>- Click on the image</span>
                ) : null}
              </label>
              <div className="flex h-[200px] w-full items-center justify-center bg-slate-300">
                {(fileObj && fileObj["photo"]?.tempURL) || oldPhoto ? (
                  <img
                    className="h-full w-full object-cover"
                    src={fileObj["photo"]?.tempURL || oldPhoto}
                    alt=""
                  />
                ) : null}
              </div>
              {oldPhoto || fileObj["photo"]?.file ? null : (
                <div className="flex h-[200px] w-full items-center justify-center bg-slate-300">
                  Select a picture
                </div>
              )}
              <input
                className="focus:shadow-outline absolute left-0 top-0 h-full w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 opacity-0 shadow focus:outline-none"
                id="photo"
                type="file"
                placeholder="Photo"
                name="photo"
                onChange={(e) => previewImage("photo", e.target)}
              />
              <p className="text-xs italic text-red-500">
                {errors.photo?.message}
              </p>
            </div>
            <div className="mb-4 flex items-center justify-center space-x-4">
              <div className="w-1/2">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  First Name
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="first_name"
                  type="text"
                  placeholder="first name"
                  name="first_name"
                  {...register("first_name")}
                />
                <p className="text-xs italic text-red-500">
                  {errors.first_name?.message}
                </p>
              </div>
              <div className="w-1/2">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Last Name
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="last_name"
                  type="text"
                  placeholder="last name"
                  name="last_name"
                  {...register("last_name")}
                />
                <p className="text-xs italic text-red-500">
                  {errors.last_name?.message}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <p className="text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                {...register("password")}
                name="password"
                className={
                  "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                }
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <InteractiveButton
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
                type="submit"
                loading={submitLoading}
                disabled={submitLoading}
              >
                Update
              </InteractiveButton>
            </div>
          </form>
        </div> */}
        <ClientTopNav />
        <div className="bg-black flex flex-col justify-center items-stretch">
          <div className="bg-neutral-900 flex w-full flex-col items-stretch pt-8 pb-12 px-20 max-md:max-w-full max-md:px-5">

            <div className="bg-neutral-800 self-center flex w-full flex-col mt-8 px-16 py-8 rounded-md items-start max-md:max-w-full max-md:px-5">
              <div className="self-stretch max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch  justify-center w-full max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-start max-md:max-w-full max-md:mt-10">
                      <div className="self-stretc mx-auto max-md:max-w-full mb-6">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex flex-col items-stretch w-[27%] max-md:w-full max-md:ml-0">
                            {/* <div className="flex-co relative flex aspect-square w-[120px justify-cente items-center text-white max-md:mt-3"> */}

                            <div className="relative mb-4 bg-whi">
                              {/* <label
                                className="mb-2 block text-sm font-bold text-gray-700"
                                for="photo"
                              >
                                Upload A Photo{" "}
                                {oldPhoto || fileObj["photo"]?.tempURL ? (
                                  <span>- Click on the image</span>
                                ) : null}
                              </label> */}
                              <div className="flex  w-full items-center justify-center bg-slate-30">
                                {(fileObj && fileObj["photo"]?.tempURL) || oldPhoto ? (
                                  <img
                                    className="h-full w-full object-cover"
                                    src={fileObj["photo"]?.tempURL || oldPhoto}
                                    alt=""
                                  />
                                ) :
                                  <div className="absolute top-0 right-8">
                                    <UserCircleIcon className="text-red-800 w-24" />
                                  </div>}
                              </div>
                              {oldPhoto || fileObj["photo"]?.file ? null : (
                                <div className="flex text-white w-full items-center justify-center bg-slate-3 mt-3 z-100">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c556408f-4202-42d1-beb4-715fdc3e79ac?"
                                    className="aspect-square object-contain object-center w-[27px] overflow-hidden self-stretch shrink-0 max-w-full"
                                  />
                                </div>
                              )}
                              <input
                                className="focus:shadow-outline absolute left-0 top-0 h-full w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 opacity-0 shadow focus:outline-none"
                                id="photo"
                                type="file"
                                placeholder="Photo"
                                name="photo"
                                onChange={(e) => previewImage("photo", e.target)}
                              />
                              <p className="text-xs italic text-red-500">
                                {errors.photo?.message}
                              </p>
                            </div>
                            {/* <div className="">
                                <UserCircleIcon className="text-white w-28" />
                              </div> */}
                            {/* <img
                                loading="lazy"
                                srcSet="..."
                                className="aspect-square object-contain object-center w-full overflow-hidden rounded-[50%]"
                              /> */}
                            {/* </div> */}
                          </div>
                          <div className="flex flex-col items-stretch w-[73%] ml-5 max-md:w-full max-md:ml-0">
                            <div className="flex flex-col items-stretch my-auto max-md:mt-10">
                              <div className="flex items-center justify-between gap-5 pr-5 max-md:pr-5">
                                <div className="text-zinc-100 text-2xl font-bold leading-7 grow whitespace-nowrap my-auto">
                                  BigMadWatch
                                </div>

                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c556408f-4202-42d1-beb4-715fdc3e79ac?"
                                  className="aspect-square object-contain object-center w-[27px] overflow-hidden self-stretch shrink-0 max-w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border mx-auto self-stretch mt-7 pt-7 pb-12 px-20 rounded-md border-solid border-white w-fit">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex flex-col items-stretch w-[46%] mx-auto max-md:w-full max-md:ml-0">
                            <div className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap max-md:mt-10">
                              Balance
                            </div>
                          </div>
                          <div className="flex flex-col items-stretch w-[54%] ml-5 max-md:w-full max-md:ml-0">
                            <div className="flex items-stretch gap-3 max-md:mt-10">
                              <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                <span className=" text-white">R</span>
                              </div>
                              <div className="text-zinc-100 text-lg font-bold leading-6 self-center grow whitespace-nowrap my-auto">
                                {" "}
                                223.323
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch ml-5 max-md:w-full max-md:ml-0">
                          <div className="flex flex-col items-stretch my-auto max-md:mt-10">
                            <div className="text-zinc-100 text-base font-medium leading-5 mt-2.5">
                              <button onClick={() => setPreStripeModal(true)} className="text-zinc-100 text-base leading-5 whitespace-nowrap bg-red-500 w-full text-center max-w-full justify-center items-center mt-3 px-5 py-4 rounded-md font-bold cursor-pointer hover:bg-red-800">
                                Buy More Tokens
                              </button>
                              <button onClick={() => setPrePaypalModal(true)} className="text-zinc-100 text-base leading-5 whitespace-nowrap bg-red-500 w-full text-center max-w-full justify-center items-center mt-3 px-5 py-4 rounded-md font-bold cursor-pointer hover:bg-red-800">
                                Withdraw Tokens
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to="/client/orders" className="text-zinc-100 text-base leading-5 whitespace-nowrap bg-red-500 w-[218px] mx-auto max-w-full justify-center text-center items-center mt-6 px-5 py-4 rounded-md font-bold cursor-pointer hover:bg-red-800">
                        My Orders
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="self-stretch mt-10 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-8">
                      <div className="bg-stone-300 w-fit flex items-stretch justify-between gap-1 rounded-xl max-md:max-w-full max-md:flex-wrap">
                        <div className="text-black text-base font-bold leading-5 whitespace-nowrap items-center bg-white grow justify-center px-5 py-2.5 rounded-xl">
                          All
                        </div>
                        <div className="text-stone-500 text-base font-bold leading-5 whitespace-nowrap items-center bg-white bg-opacity-0 grow justify-center px-5 py-2.5 rounded-xl">
                          On Sale
                        </div>
                      </div>
                      <div className="mt-6 max-md:max-w-full">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex-col flex max:w-[302px] items-center px-">
                            <div style={{
                              position: 'relative',
                            }}>
                              <VideoThumbnail
                                videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                              />
                              <Link to={`/client/view-video/1`}>
                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                              </Link>
                              <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                            </div>
                            <div className="text-white flex justify-between items-center w-full mt-2">
                              <span className="text-sm font-bold">Airplane Crashed</span>
                              <span className="text-xs font-bold">24 minutes ago</span>
                            </div>
                          </div>
                          <div className="flex-col flex max:w-[302px] items-center px-">
                            <div style={{
                              position: 'relative',
                            }}>
                              <VideoThumbnail
                                videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                              />
                              <Link to={`/client/view-video/1`}>
                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                              </Link>
                              <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                            </div>
                            <div className="text-white flex justify-between items-center w-full mt-2">
                              <span className="text-sm font-bold">Airplane Crashed</span>
                              <span className="text-xs font-bold">24 minutes ago</span>
                            </div>
                          </div>
                          <div className="flex-col flex max:w-[302px] items-center px-">
                            <div style={{
                              position: 'relative',
                            }}>
                              <VideoThumbnail
                                videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                              />
                              <Link to={`/client/view-video/1`}>
                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                              </Link>
                              <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                            </div>
                            <div className="text-white flex justify-between items-center w-full mt-2">
                              <span className="text-sm font-bold">Airplane Crashed</span>
                              <span className="text-xs font-bold">24 minutes ago</span>
                            </div>
                          </div>
                          <div className="flex-col flex max:w-[302px] items-center px-">
                            <div style={{
                              position: 'relative',
                            }}>
                              <VideoThumbnail
                                videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                              />
                              <Link to={`/client/view-video/1`}>
                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                              </Link>
                              <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                            </div>
                            <div className="text-white flex justify-between items-center w-full mt-2">
                              <span className="text-sm font-bold">Airplane Crashed</span>
                              <span className="text-xs font-bold">24 minutes ago</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pre stripe modal */}
        {preStripeModal &&
          <PreStripeModal preStripeModal={preStripeModal} amount={amount} setAmount={setAmount} setPreStripeModal={setPreStripeModal} setStripeModal={setStripeModal} />
        }

        {/* pre paypal modal */}
        {prePaypalModal &&
          <PrePaypalModal prePaypalModal={prePaypalModal} coinExchange={coinExchange} setCoinExchange={setCoinExchange} setPrePaypalModal={setPrePaypalModal} setPaypalModal={setPaypalModal} />
        }

        {paypalModal &&
          <PaypalModal paypalModal={paypalModal} setPaypalModal={setPaypalModal} coinExchange={coinExchange} setCoinExchange={setCoinExchange} />
        }

        {/* stripe checkout modal */}
        {stripeModal &&
          <div className="App">
            {clientSecret && loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx") && (
              <Elements options={options} stripe={loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")}>
                <StripeModal clientSecret={clientSecret} paymentIntent={"pi_1Gt0RG2eZvKYlo2CtxkQK2rm"} stripeModal={stripeModal} amount={amount} setAmount={setAmount} setStripeModal={setStripeModal} />
              </Elements>
            )}
          </div>
        }
      </main>
    </>
  );
};

export default ClientProfilePage;
