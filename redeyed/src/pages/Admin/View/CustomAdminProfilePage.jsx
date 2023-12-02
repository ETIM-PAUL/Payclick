
  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import MkdSDK from "Utils/MkdSDK";
  import { GlobalContext, showToast } from "Context/Global";
  import { tokenExpireError,AuthContext } from "Context/Auth";
  import { InteractiveButton } from "Components/InteractiveButton";

  let sdk = new MkdSDK();

  const AdminProfilePage = () => {
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

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "profile",
      },
    });

    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="rounded bg-white p-5 shadow  ">
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
              {/* <img className="absolute top-0 left-0 w-full h-full" src="" alt="profile picture" /> */}
              <input
                className="focus:shadow-outline absolute left-0 top-0 h-full w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 opacity-0 shadow focus:outline-none"
                id="photo"
                type="file"
                placeholder="Photo"
                name="photo"
                onChange={(e) => previewImage("photo", e.target)}
                // {...register("photo")}
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
        </div>
      </main>
    </>
    );
  };

  export default AdminProfilePage;
  