
    import React from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "Utils/MkdSDK";
    import { useNavigate } from "react-router-dom";
    import { tokenExpireError } from "Context/Auth";
    import { GlobalContext, showToast } from "Context/Global";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { isImage, empty, isVideo, isPdf } from "Utils/utils";
    import {MkdInput} from "Components/MkdInput";
    import {InteractiveButton} from "Components/InteractiveButton";
    import {SkeletonLoader }from"Components/Skeleton"
    
    const AddUserPage = () => {
      const { dispatch: globalDispatch } = React.useContext(GlobalContext);
      const schema = yup
        .object({
          
        	oauth: yup.string(),
        	role: yup.string(),
        	first_name: yup.string(),
        	last_name: yup.string(),
        	email: yup.string(),
        	password: yup.string(),
        	type: yup.string(),
        	verify: yup.string(),
        	phone: yup.string(),
        	photo: yup.string(),
        	refer: yup.string(),
        	stripe_uid: yup.string(),
        	paypal_uid: yup.string(),
        	two_factor_authentication: yup.string(),
        	status: yup.string(),
        })
        .required();
    
      const { dispatch } = React.useContext(GlobalContext);
      const [fileObj, setFileObj] = React.useState({});
      const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
    
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const [pageDetails, setPageDetails] = React.useState([]);

    const getPageDetails = async () => {
      const result = await (new TreeSDK()).getList("table")
                                          .catch(e => console.error(object))
      setPageDetails(result.list);
    }
    
      const previewImage = (field, target) => {
        let tempFileObj = fileObj;
        tempFileObj[field] = {
          file: target.files[0],
          tempURL: URL.createObjectURL(target.files[0]),
        };
        setFileObj({ ...tempFileObj });
      };
    
      const onSubmit = async (_data) => {
        let sdk = new MkdSDK();
    setIsSubmitLoading(true)
        try {
          for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
          }
    
          sdk.setTable("user");
    
          const result = await sdk.callRestAPI(
            {
              
        		oauth: _data.oauth,
        		role: _data.role,
        		first_name: _data.first_name,
        		last_name: _data.last_name,
        		email: _data.email,
        		password: _data.password,
        		type: _data.type,
        		verify: _data.verify,
        		phone: _data.phone,
        		photo: _data.photo,
        		refer: _data.refer,
        		stripe_uid: _data.stripe_uid,
        		paypal_uid: _data.paypal_uid,
        		two_factor_authentication: _data.two_factor_authentication,
        		status: _data.status,
         
            },
            "POST"
          );
          if (!result.error) {
            showToast(globalDispatch, "Added");
            navigate("/admin/user");
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
          setIsSubmitLoading(false)
        } catch (error) {
          setIsSubmitLoading(false)
          console.log("Error", error);
          setError("oauth", {
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
            path: "user",
          },
        });
      }, []);

      return (
        <div className=" shadow-md rounded  mx-auto p-5">
          <h4 className="text-2xl font-medium">Add User</h4>
          <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
    
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"oauth"}
      errors={errors}
      label={"Oauth"}
      placeholder={"Oauth"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"role"}
      errors={errors}
      label={"Role"}
      placeholder={"Role"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"first_name"}
      errors={errors}
      label={"First Name"}
      placeholder={"First Name"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"last_name"}
      errors={errors}
      label={"Last Name"}
      placeholder={"Last Name"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"email"}
      errors={errors}
      label={"Email"}
      placeholder={"Email"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"password"}
      errors={errors}
      label={"Password"}
      placeholder={"Password"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"number"}
      page={"user"}
      name={"type"}
      errors={errors}
      label={"Type"}
      placeholder={"Type"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"number"}
      page={"user"}
      name={"verify"}
      errors={errors}
      label={"Verify"}
      placeholder={"Verify"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"phone"}
      errors={errors}
      label={"Phone"}
      placeholder={"Phone"}
      register={register}
      className={""}
    />
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photo"
        >
          Photo
        </label>
        <textarea
          placeholder="Photo"
          {...register("photo")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.photo?.message ? "border-red-500" : ""
          }`}
          row={50}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.photo?.message}
        </p>
      </div>
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"refer"}
      errors={errors}
      label={"Refer"}
      placeholder={"Refer"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"stripe_uid"}
      errors={errors}
      label={"Stripe Uid"}
      placeholder={"Stripe Uid"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"user"}
      name={"paypal_uid"}
      errors={errors}
      label={"Paypal Uid"}
      placeholder={"Paypal Uid"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"number"}
      page={"user"}
      name={"two_factor_authentication"}
      errors={errors}
      label={"Two Factor Authentication"}
      placeholder={"Two Factor Authentication"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"number"}
      page={"user"}
      name={"status"}
      errors={errors}
      label={"Status"}
      placeholder={"Status"}
      register={register}
      className={""}
    />
          
        
            <InteractiveButton 
              type="submit"
              loading={isSubmitLoading}
              disabled={isSubmitLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </InteractiveButton>
          </form>
        </div>
      );
    };
    
    export default AddUserPage;
    
    
    