
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

    const EditSettingPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	setting_key: yup.string(),
        	setting_value: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate();
    
          	const [setting_key, setSettingKey] = useState('');
          	const [setting_value, setSettingValue] = useState('');
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

            sdk.setTable("setting");
            const result = await sdk.callRestAPI({ id: Number(params?.id)}, "GET");
            if (!result.error) {
    
        	 setValue('setting_key', result.model.setting_key);
        	 setValue('setting_value', result.model.setting_value);

    
      	 setSettingKey(result.model.setting_key);
      	 setSettingValue(result.model.setting_value);
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
            sdk.setTable("setting");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
            
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
        		setting_key: _data.setting_key,
        		setting_value: _data.setting_value,

       
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/admin/setting");
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
        setError("setting_key", {
            type: "manual",
            message: error.message,
        });
        }
    };
    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "setting",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Setting</h4>
       {loading? (<SkeletonLoader/>) :  (<form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"setting_key"}
      errors={errors}
      label={"Setting Key"}
      placeholder={"Setting Key"}
      register={register}
      className={""}
    />
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="setting_value"
        >
          Setting Value
        </label>
        <textarea
          placeholder="Setting Value"
          {...register("setting_value")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.setting_value?.message ? "border-red-500" : ""
          }`}
          row={50}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.setting_value?.message}
        </p>
      </div>
        
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

    export default EditSettingPage;

    