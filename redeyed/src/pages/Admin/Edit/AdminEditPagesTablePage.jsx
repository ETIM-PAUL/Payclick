
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

    const EditPagesPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	header: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate();
    
          	const [header, setHeader] = useState('');
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

            sdk.setTable("pages");
            const result = await sdk.callRestAPI({ id: Number(params?.id)}, "GET");
            if (!result.error) {
    
        	 setValue('header', result.model.header);

    
      	 setHeader(result.model.header);
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
            sdk.setTable("pages");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
            
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
        		header: _data.header,

       
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/admin/pages");
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
        setError("header", {
            type: "manual",
            message: error.message,
        });
        }
    };
    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "pages",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Pages</h4>
       {loading? (<SkeletonLoader/>) :  (<form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
      <MkdInput
      type={"text"}
      page={"edit"}
      name={"header"}
      errors={errors}
      label={"Header"}
      placeholder={"Header"}
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

    export default EditPagesPage;

    