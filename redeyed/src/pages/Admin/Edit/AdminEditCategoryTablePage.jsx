
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

    const EditCategoryPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	name: yup.string(),
        	status: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate();
    
          	const [name, setName] = useState('');
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

            sdk.setTable("category");
            const result = await sdk.callRestAPI({ id: Number(params?.id)}, "GET");
            if (!result.error) {
    
        	 setValue('name', result.model.name);
        	 setValue('status', result.model.status);

    
      	 setName(result.model.name);
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
            sdk.setTable("category");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
            
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
        		name: _data.name,
        		status: _data.status,

       
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/admin/category");
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
        setError("name", {
            type: "manual",
            message: error.message,
        });
        }
    };
    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "category",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Category</h4>
       {loading? (<SkeletonLoader/>) :  (<form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"name"}
      errors={errors}
      label={"Name"}
      placeholder={"Name"}
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

    export default EditCategoryPage;

    