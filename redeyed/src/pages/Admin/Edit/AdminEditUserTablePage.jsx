
    import React, { useEffect, useState } from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "Utils/MkdSDK";
    import { useNavigate, useParams } from "react-router-dom";
    import { AuthContext, tokenExpireError } from "Context/Auth";
    import { GlobalContext, showToast } from "Context/Global";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { isImage, empty, isVideo, isPdf } from "Utils/utils";
    import {MkdInput} from "Components/MkdInput";
import {InteractiveButton} from "Components/InteractiveButton"


    let sdk = new MkdSDK();

    const EditUserPage = () => {
    const { dispatch } = React.useContext(AuthContext);
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
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate();
    
          	const [oauth, setOauth] = useState('');
          	const [role, setRole] = useState('');
          	const [first_name, setFirstName] = useState('');
          	const [last_name, setLastName] = useState('');
          	const [email, setEmail] = useState('');
          	const [password, setPassword] = useState('');
          	const [type, setType] = useState(0);
          	const [verify, setVerify] = useState(0);
          	const [phone, setPhone] = useState('');
          	const [photo, setPhoto] = useState('');
          	const [refer, setRefer] = useState('');
          	const [stripe_uid, setStripeUid] = useState('');
          	const [paypal_uid, setPaypalUid] = useState('');
          	const [two_factor_authentication, setTwoFactorAuthentication] = useState(0);
          	const [status, setStatus] = useState(0);
    // const [id, setId] = useState(0);
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
        (async function () {
        try {
            setLoading(true)

            sdk.setTable("user");
            const result = await sdk.callRestAPI({ id: Number(params?.id)}, "GET");
            if (!result.error) {
    
        	 setValue('oauth', result.model.oauth);
        	 setValue('role', result.model.role);
        	 setValue('first_name', result.model.first_name);
        	 setValue('last_name', result.model.last_name);
        	 setValue('email', result.model.email);
        	 setValue('password', result.model.password);
        	 setValue('type', result.model.type);
        	 setValue('verify', result.model.verify);
        	 setValue('phone', result.model.phone);
        	 setValue('photo', result.model.photo);
        	 setValue('refer', result.model.refer);
        	 setValue('stripe_uid', result.model.stripe_uid);
        	 setValue('paypal_uid', result.model.paypal_uid);
        	 setValue('two_factor_authentication', result.model.two_factor_authentication);
        	 setValue('status', result.model.status);

    
      	 setOauth(result.model.oauth);
      	 setRole(result.model.role);
      	 setFirstName(result.model.first_name);
      	 setLastName(result.model.last_name);
      	 setEmail(result.model.email);
      	 setPassword(result.model.password);
      	 setType(result.model.type);
      	 setVerify(result.model.verify);
      	 setPhone(result.model.phone);
      	 setPhoto(result.model.photo);
      	 setRefer(result.model.refer);
      	 setStripeUid(result.model.stripe_uid);
      	 setPaypalUid(result.model.paypal_uid);
      	 setTwoFactorAuthentication(result.model.two_factor_authentication);
      	 setStatus(result.model.status);
                setId(result.model.id);
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)

            console.log("error", error);
            tokenExpireError(dispatch, error.message);
        }
        })();
    }, []);

    const previewImage = (field, target) => {
        let tempFileObj = fileObj;
        tempFileObj[field] = {
        file: target.files[0],
        tempURL: URL.createObjectURL(target.files[0]),
        };
        setFileObj({ ...tempFileObj });
    };


    const onSubmit = async (_data) => {
        setIsLoading(true)
        try {
            sdk.setTable("user");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
            
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
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
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
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
        setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        console.log("Error", error);
        setError("oauth", {
            type: "manual",
            message: error.message,
        });
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
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit User</h4>
       {loading? (<SkeletonLoader/>) :  (<form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"oauth"}
      errors={errors}
      label={"Oauth"}
      placeholder={"Oauth"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"role"}
      errors={errors}
      label={"Role"}
      placeholder={"Role"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"first_name"}
      errors={errors}
      label={"First Name"}
      placeholder={"First Name"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"last_name"}
      errors={errors}
      label={"Last Name"}
      placeholder={"Last Name"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"email"}
      errors={errors}
      label={"Email"}
      placeholder={"Email"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"password"}
      errors={errors}
      label={"Password"}
      placeholder={"Password"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"number"}
      page={"edit"}
      name={"type"}
      errors={errors}
      label={"Type"}
      placeholder={"Type"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"number"}
      page={"edit"}
      name={"verify"}
      errors={errors}
      label={"Verify"}
      placeholder={"Verify"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
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
      page={"edit"}
      name={"refer"}
      errors={errors}
      label={"Refer"}
      placeholder={"Refer"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"stripe_uid"}
      errors={errors}
      label={"Stripe Uid"}
      placeholder={"Stripe Uid"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"paypal_uid"}
      errors={errors}
      label={"Paypal Uid"}
      placeholder={"Paypal Uid"}
      register={register}
      className={""}
    />
        
            
      <MkdInput
      type={"number"}
      page={"edit"}
      name={"two_factor_authentication"}
      errors={errors}
      label={"Two Factor Authentication"}
      placeholder={"Two Factor Authentication"}
      register={register}
      className={""}
    />
          
        
            
      <MkdInput
      type={"number"}
      page={"edit"}
      name={"status"}
      errors={errors}
      label={"Status"}
      placeholder={"Status"}
      register={register}
      className={""}
    />
          
        
            <InteractiveButton
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            loading={isLoading}
            disable={isLoading}
            >
            Submit
            </InteractiveButton>
        </form>)}
        </div>
    );
    };

    export default EditUserPage;

    